import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import { fetchImages } from './Api,js';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [searchError, setSearchError] = useState('');

  const fetchImagesData = useCallback(async () => {
    if (!query) return;
    try {
      setIsLoading(true);
      const data = await fetchImages(query, page);
      
      if (data.results.length === 0) {
        setError('Error! Invalid request!');
        setImages([]);
        setShowBtn(false);
      } else {
        setImages(prevImages => (page === 1 ? data.results : [...prevImages, ...data.results]));
        setShowBtn(data.total_pages && data.total_pages !== page);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImagesData();
  }, [fetchImagesData]);

  const handleSearch = (searchInputValue) => {
    setQuery(searchInputValue);
    setPage(1);
    setError(null);
    setSearchError('');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <div className={css.containerApp}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} setSearchError={setSearchError} />

      {error && <ErrorMessage message={error} onClose={closeError} />}

      {searchError && <ErrorMessage message={searchError} onClose={() => setSearchError('')} />}

      {images.length > 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {showBtn && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}

      {isLoading && <Loader />}

      {showModal && selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;


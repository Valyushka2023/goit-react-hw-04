import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { Toaster } from 'react-hot-toast'; 
import css from './App.module.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const CLIENT_ID = 'AO_bocnXiub9X5LTcIGZ44x0_b_cAAE2ccocCdfW534';
const DEFAULT_RESULTS_PER_PAGE = 9;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [searchError, setSearchError] = useState('');

  const fetchImages = useCallback(async () => {
    if (searchTerm) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_URL}?client_id=${CLIENT_ID}&query=${searchTerm}&page=${page}&per_page=${DEFAULT_RESULTS_PER_PAGE}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.errors?.[0]?.message || 'API request failed');
          setImages([]);
          return;
        }

        const data = await response.json();
        if (data.results.length === 0) {
          setError('Error! Invalid request!');
          setImages([]);
          setShowBtn(false);
        } else {
          setImages((prevImages) => (page === 1 ? data.results : [...prevImages, ...data.results]));
          const totalPages = data.total_pages;
          setShowBtn(totalPages && totalPages > page);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [searchTerm, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = (searchInputValue) => {
    setSearchTerm(searchInputValue);
    setPage(1);
    setError(null);
    setSearchError('');
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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

      {isLoading && <Loader />}

      {!isLoading && !error && images.length > 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {showBtn && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}

      {showModal && selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;


import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.containerImageGallery}>
      {images.map((image) => (
        <li className={css.itemImageGallery} key={image.id}>
          <ImageCard image={image} onClick={() => openModal(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;


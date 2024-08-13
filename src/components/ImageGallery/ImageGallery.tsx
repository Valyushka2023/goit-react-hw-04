import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image } from '..//App//App.types';

interface ImageGalleryProps {
  images: Image[];
  openModal: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
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
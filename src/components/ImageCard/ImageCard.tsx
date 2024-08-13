import React from 'react';
import css from './ImageCard.module.css';
import { Image } from '..//App//App.types';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const imageUrl = `${image.urls.raw}&w=300&h=200&fit=crop`;

  return (
    <div className={css.containerImageCard} onClick={onClick}>
      <img className={css.imgImageCard} src={imageUrl} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
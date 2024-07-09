import css from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  
  const imageUrl = `${image.urls.raw}&w=300&h=200&fit=crop`; 

  return (
    <div className={css.containerImageCard} onClick={onClick}>
      <img className={css.imgImageCard} src={imageUrl} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;


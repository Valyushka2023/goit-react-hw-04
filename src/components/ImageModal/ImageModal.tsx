import React from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';


interface Image {
  urls: {
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}


interface ImageModalProps {
  image: Image;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      ariaHideApp={false}
    >
      <button onClick={onClose} className={css.closeButton}>Close</button>
      <div className={css.imageContainer}>
        <img className={css.imgImageModal} src={image.urls.regular} alt={image.alt_description} />
      </div>
      <p className={css.author}>Author: {image.user.name}</p>
    </Modal>
  );
};

export default ImageModal;
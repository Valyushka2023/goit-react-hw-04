import { createPortal } from 'react-dom';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(
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
    </Modal>,
    modalRoot
  );
};

export default ImageModal;
import PropTypes from 'prop-types';
import css from './ErrorMessage.module.css';

const ErrorMessage = ({ message, onClose }) => (
  <div className={css.overlay}>
    <div className={css.error}>
      <p className={css.text}>{message}</p>
      <button className={css.closeButton} onClick={onClose}>Close</button>
    </div>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorMessage;
import React from 'react';
import css from './ErrorMessage.module.css';


interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => (
  <div className={css.overlay}>
    <div className={css.error}>
      <p className={css.text}>{message}</p>
      <button className={css.closeButton} onClick={onClose}>Close</button>
    </div>
  </div>
);

export default ErrorMessage;
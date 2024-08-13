import React from 'react';
import { motion } from 'framer-motion';
import css from './Loader.module.css';


const Loader: React.FC = () => {
  const circleVariants = {
    animate: {
      scale: [1, 2, 1],
      rotate: [0, 360, 0],
      transition: {
        duration: 2,
        ease: [0.4, 0, 0.2, 1],
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className={css.loader}>
      <svg width="50" height="50" viewBox="0 0 50 50">
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="#007bff"
          custom={circleVariants} 
        />
      </svg>
    </div>
  );
};

export default Loader;
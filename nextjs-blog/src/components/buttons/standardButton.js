import React from 'react';
import styles from './standardButton.module.css';

const StandardButton = ({ onClick, children, type = 'button', variant }) => {
  const buttonClass = variant === 'large' 
    ? `${styles.button} ${styles.largeButton}`
    : styles.button;

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default StandardButton;

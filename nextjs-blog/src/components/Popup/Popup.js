import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ title, onSave, placeholder, value, onChange }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          {title}
          <textarea
            className={styles.textarea}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
        <button onClick={onSave} className={styles.saveButton}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Popup;
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Popup.module.css';
import StandardButton from '../buttons/standardButton';
import StandardInput from '../inputs/standardInput';

const Popup = ({ title, onSave, placeholder, value, onChange }) => {
  return ReactDOM.createPortal(
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          {title}
          <StandardInput
            type="textarea"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles.textarea}
          />
        </div>
        <StandardButton onClick={onSave}>
          Save
        </StandardButton>
      </div>
    </div>,
    document.body
  );
};

export default Popup;
import React from 'react';
import styles from './InfoCard.module.css';

const InfoCard = ({ title, description, items = [], openPopup }) => {
  return (
    <div className={styles.card}>
      <div className={styles.titleSection}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <hr className={styles.line} />
      </div>
      {items.length > 0 && (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      )}
      <button 
        onClick={openPopup} 
        className={styles.button}
      >
        Click to Edit
      </button>
    </div>
  );
};

export default InfoCard;
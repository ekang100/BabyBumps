// InfoCard.js
import React from 'react';

const InfoCard = ({ title, description, items = [] }) => {
  return (
    <div style={styles.card}>
      <div style={styles.titleSection}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>
        <hr style={styles.line} />
      </div>
      {items.length > 0 && (
        <ul style={styles.list}>
          {items.map((item, index) => (
            <li key={index} style={styles.listItem}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ff5a5f',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#ffe0e0',
    maxWidth: '300px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  titleSection: {
    backgroundColor: '#ffb3b3',
    padding: '10px',
    borderRadius: '5px',
  },
  title: {
    fontSize: '1.1rem',
    color: '#ff5a5f',
    margin: '0',
  },
  description: {
    fontSize: '0.9rem',
    color: '#333',
  },
  list: {
    paddingLeft: '15px',
    margin: '10px 0 0 0',
    listStyleType: 'disc',
    color: '#333',
    backgroundColor: '#ffe0e0',
    padding: '10px',
  },
  listItem: {
    fontSize: '0.9rem',
    lineHeight: '1.4',
  },
  line: {
    border: 'none',
    borderTop: '1px solid #ff5a5f',
    margin: '10px 0',
  },
};

export default InfoCard;

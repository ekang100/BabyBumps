import styles from '../styles/About.module.css';

export default function About() {
  return (
    <div className={styles.Container}>
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </div>
  );
}

// Set the fixedFooter property to true for a fixed footer
About.fixedFooter = true;
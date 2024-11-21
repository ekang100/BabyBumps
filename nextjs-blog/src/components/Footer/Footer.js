import LinkItem from "./LinkItem";
import styles from './Footer.module.css';

const Footer = ({ fixed }) => (
    <footer className={`${styles.Common} ${fixed ? styles.Fixed : styles.Scrollable}`}>
    <img
      className={styles.logoImage}
      src="/logo_white.svg" 
      alt="Logo"
    />
    <div className={styles.linksContainer}>
      <div className={styles.linkGroup}>
        <LinkItem href="/privacy-policy" text="Privacy Policy" />
        <LinkItem href="/terms" text="Terms of Service" />
        <LinkItem href="/contact" text="Contact" />
      </div>
      <div className={styles.copyright}>
        © 2024 BabyBumps. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 
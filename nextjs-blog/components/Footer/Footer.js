import LinkItem from "./LinkItem";
import styles from "../../styles/Layout.module.css";

function Footer({ fixed }) {
  return (
    <footer className={`${styles.footerCommon} ${fixed ? styles.footerFixed : styles.footerScrollable}`}>
      <img
        className={styles.logoImage}
        src="logo_white.svg" // Update with the correct path to your SVG
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
}

export default Footer;
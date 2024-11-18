import Link from "next/link";
import styles from "../styles/Layout.module.css";

export default function Footer({ fixed }) {
  return (
    <footer className={`${styles.footerCommon} ${fixed ? styles.footerFixed : styles.footerScrollable}`}>
      <img
        className={styles.logoImage}
        src="logo_white.svg" // Update with the correct path to your SVG
        alt="Logo"
      />
      <div className={styles.linksContainer}>
        <div className={styles.linkGroup}>
          <Link href="/privacy-policy">
            <div className={styles.linkItem}>
              <div className={styles.linkText}>Privacy Policy</div>
            </div>
          </Link>
          <Link href="/terms">
            <div className={styles.linkItem}>
              <div className={styles.linkText}>Terms of Service</div>
            </div>
          </Link>
          <Link href="/contact">
            <div className={styles.linkItem}>
              <div className={styles.linkText}>Contact</div>
            </div>
          </Link>
        </div>
        <div className={styles.copyright}>
          © 2024 BabyBumps. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
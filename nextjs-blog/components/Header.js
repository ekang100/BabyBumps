import Link from "next/link";
import styles from "../styles/Layout.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <img
          className={styles.logoImage}
          src="Logo.svg" 
          alt="Logo"
        />
        <nav className={styles.navbar}>
          <Link href="/about">
            <div className={styles.navItem}>
              <div className={styles.navText}>ABOUT US</div>
            </div>
          </Link>
          <Link href="/surrogates">
            <div className={styles.navItem}>
              <div className={styles.navText}>FIND A SURROGATE</div>
            </div>
          </Link>
          <Link href="/forum">
            <div className={styles.navItem}>
              <div className={styles.navText}>FORUM</div>
            </div>
          </Link>
          <Link href="/vendors">
            <div className={styles.navItem}>
              <div className={styles.navText}>VENDORS</div>
            </div>
          </Link>
          <Link href="/contact">
            <div className={styles.navItem}>
              <div className={styles.navText}>CONTACT</div>
            </div>
          </Link>
        </nav>
      </div>
      <div className={styles.navItem}>
        <div className={styles.navText}>ACCOUNT</div>
      </div>
    </header>
  );
}
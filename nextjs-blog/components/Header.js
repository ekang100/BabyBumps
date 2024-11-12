import Link from "next/link";
import styles from "../styles/Vendors.module.css"; // Assuming you want to use the same styles

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link legacyBehavior href="/">
          <a className={styles.logo}>Baby Bumps</a>
        </Link>
      </div>
      <nav className={styles.navbar}>
        <Link href="/about">About Us</Link>
        <Link href="/surrogates">Find a Surrogate</Link>
        <Link href="/forum">Forum</Link>
        <Link href="/vendors">Vendors</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
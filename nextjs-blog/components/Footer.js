import Link from "next/link";
import styles from "../styles/Layout.module.css";

export default function Footer({ fixed }) {
  return (
    <footer className={fixed ? styles.footerFixed : styles.footerScrollable}>
      <div className={styles.footerLinks}>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <p>Baby Bumps © 2024. All rights reserved.</p>
    </footer>
  );
}
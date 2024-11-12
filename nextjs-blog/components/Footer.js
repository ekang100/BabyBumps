import Link from "next/link";
import styles from "../styles/Vendors.module.css"; // Assuming you want to use the same styles

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <p>Baby Bumps © 2024. All rights reserved.</p>
    </footer>
  );
}
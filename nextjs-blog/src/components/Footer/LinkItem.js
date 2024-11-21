import Link from "next/link";
import styles from './Footer.module.css';

function FooterLinkItem({ href, text }) {
  return (
    <Link href={href}>
      <div className={styles.linkItem}>
        <div className={styles.linkText}>{text}</div>
      </div>
    </Link>
  );
}

export default FooterLinkItem;
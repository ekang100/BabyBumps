import Link from "next/link";
import styles from "../../styles/Layout.module.css";

function NavItem({ href, text }) {
  return (
    <Link href={href}>
      <div className={styles.navItem}>
        <div className={styles.navText}>{text}</div>
      </div>
    </Link>
  );
}

export default NavItem;
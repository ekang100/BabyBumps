import NavItem from "./NavItem";
import styles from "../../styles/Layout.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <img
          className={styles.logoImage}
          src="Logo.svg" 
          alt="Logo"
        />
        <nav className={styles.navbar}>
          <NavItem href="/" text="ABOUT US" />
          <NavItem href="/processmap" text="PROCESS MAP" />
          <NavItem href="/forum" text="FORUM" />
          <NavItem href="/vendors" text="VENDORS" />
          <NavItem href="/updatedpm" text="WORKFLOW" />
        </nav>
      </div>
      <NavItem href="/account" text="ACCOUNT" />
    </header>
  );
}

export default Header;
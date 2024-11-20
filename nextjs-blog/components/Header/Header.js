import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa"; 
import NavItem from "./NavItem";
import styles from "../../styles/Layout.module.css";
import { getCurrentUser } from "../../utils/userUtils";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateAuthStatus = () => {
      const user = getCurrentUser();
      setIsAuthenticated(!!user);
      setIsLoading(false);
    };
  
    updateAuthStatus(); // Initial check
  
    // Listen for custom "user" events
    window.addEventListener('user_change', updateAuthStatus);
  
    return () => {
      window.removeEventListener('user_change', updateAuthStatus);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <img className={styles.logoImage} src="Logo.svg" alt="Logo" />
        <nav className={styles.navbar}>
          <NavItem href="/" text="ABOUT US" />
          <NavItem href="/processmap" text="PROCESS MAP" />
          <NavItem href="/forum" text="FORUM" />
          <NavItem href="/vendors" text="VENDORS" />
          <NavItem href="/updatedpm" text="WORKFLOW" />
        </nav>
      </div>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <FaSpinner className={styles.spinner} />
        </div>
      ) : (
        <NavItem
          href={isAuthenticated ? "/account" : "/login"}
          text={isAuthenticated ? "ACCOUNT" : "LOGIN"}
        />
      )}
    </header>
  );
}

export default Header;
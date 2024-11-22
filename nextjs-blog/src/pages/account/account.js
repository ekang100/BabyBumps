import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCurrentUser, logout } from "../../utils/userUtils";
import styles from "./account.module.css";
import StandardButton from "../../components/buttons/standardButton";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/auth");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.accountCard}>
        <h1>My Account</h1>
        <div className={styles.userProfile}>
          <h2>Profile Information</h2>
          <div className={styles.profileDetails}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        </div>
        <StandardButton onClick={handleLogout}>
          Sign Out
        </StandardButton>
      </div>
    </div>
  );
};
AccountPage.fixedFooter = true;

export default AccountPage;
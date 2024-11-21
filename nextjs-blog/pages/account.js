import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCurrentUser, logout } from "../utils/userUtils";
import styles from "../styles/Account.module.css";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.accountCard}>
        <h1>Account Dashboard</h1>

        <div className={styles.userProfile}>
          <h2>Profile Information</h2>
          <div className={styles.profileDetails}>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          </div>
        </div>

        <div className={styles.userNotes}>
          <h2>Your Notes</h2>
          <p>Total Notes: {user.notes.length}</p>
          {user.notes.length > 0 ? (
            <ul>
              {user.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          ) : (
            <p>No notes yet</p>
          )}
        </div>

        <button onClick={handleLogout} className={styles.logoutButton}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

AccountPage.fixedFooter = true;

export default AccountPage;

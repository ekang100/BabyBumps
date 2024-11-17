import React, { useState } from 'react';
import { login, logout } from '../utils/userUtils';

const LoginTest = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    const success = login(username, password); // Call the login function
    if (success) {
      alert('Login successful!');
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function
    setIsLoggedIn(false);
    alert('Logged out successfully!');
  };

  return (
    <div>
      <h1>Test Login</h1>
      {!isLoggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginTest;

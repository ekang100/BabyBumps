class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }
  
  // Predefined list of users for testing purposes
  const predefinedUsers = [
    new User("testUser1", "password123"),
    new User("demoUser2", "securePassword"),
    new User("AndrewDawson", "password")
  ];
  
  // userUtils.js (update functions with localStorage)
export const login = (username, password) => {
    if (typeof window === 'undefined') return false; // Prevent SSR issues
    const user = predefinedUsers.find(
      (user) => user.username === username && user.password === password
    );
  
    if (user) {
      localStorage.setItem("currentUser", username);
      return true;
    } else {
      return false;
    }
  };
  
  export const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("currentUser");
    }
  };
  
  
  // Function to save a note for the current user
  export const saveNote = (note) => {
    const username = localStorage.getItem("currentUser");
    if (username) {
      const notesKey = `notes_${username}`; // Key for storing user-specific notes
      const notes = JSON.parse(localStorage.getItem(notesKey)) || [];
      notes.push(note); // Add the new note
      localStorage.setItem(notesKey, JSON.stringify(notes)); // Save updated notes
    }
  };
  
  // Function to retrieve notes for the current user
  export const getNotes = () => {
    const username = localStorage.getItem("currentUser");
    if (username) {
      const notesKey = `notes_${username}`;
      return JSON.parse(localStorage.getItem(notesKey)) || []; // Return notes or an empty array
    }
    return []; // No notes if no user is logged in
  };
  

  export const getPredefinedUsers = () => predefinedUsers;
  
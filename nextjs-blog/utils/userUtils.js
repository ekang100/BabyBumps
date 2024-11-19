class User {
  constructor(username, password, id, name, email) {
    this.username = username;
    this.password = password;
    this.id = id;
    this.name = name;
    this.email = email;
    this.notes = [];
  }
}

// Predefined list of users for testing purposes
const predefinedUsers = [
  new User("testUser1", "password123", 1, "Test User", "test1@example.com"),
  new User("demoUser2", "securePassword", 2, "Demo User", "demo2@example.com"),
  new User(
    "AndrewDawson",
    "password",
    3,
    "Andrew Dawson",
    "andrew@example.com"
  ),
];

export const login = (username, password) => {
  if (typeof window === "undefined") return false;

  const user = predefinedUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    return true;
  }
  return false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser");
  }
};

export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const updateUserNotes = (notes) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    // Update the notes in both localStorage and predefinedUsers array
    const updatedUser = {
      ...currentUser,
      notes: notes,
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Update the user's notes in predefinedUsers
    const userIndex = predefinedUsers.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
      predefinedUsers[userIndex].notes = notes;
    }
  }
};

// Function to save a note for the current user
export const saveNote = (note) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const userNotes = currentUser.notes || [];
    const updatedNotes = [...userNotes, note];
    updateUserNotes(updatedNotes);
  }
};

// Function to retrieve notes for the current user
export const getNotes = () => {
  const currentUser = getCurrentUser();
  return currentUser?.notes || [];
};

export const getPredefinedUsers = () => predefinedUsers;

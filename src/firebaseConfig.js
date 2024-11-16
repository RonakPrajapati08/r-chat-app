// // firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
// } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCpR8pjfUxza301B5zqQVqDr1XrIe8j1XQ",
//   authDomain: "chat-app-d18c2.firebaseapp.com",
//   databaseURL: "https://chat-app-d18c2-default-rtdb.firebaseio.com",
//   projectId: "chat-app-d18c2",
//   storageBucket: "chat-app-d18c2.firebasestorage.app",
//   messagingSenderId: "409837506937",
//   appId: "1:409837506937:web:12768c8b363932946f1fa8",
//   measurementId: "G-FKKPXQJF9Q",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();
// const db = getFirestore(app);

// // Function to update the user status in Firestore
// const updateUserStatus = async (userId, status) => {
//   const userDocRef = doc(db, "users", userId);

//   try {
//     // Check if the document exists
//     const docSnap = await getDoc(userDocRef);

//     if (docSnap.exists()) {
//       // Document exists, update status
//       await updateDoc(userDocRef, { isOnline: status });
//       console.log("User status updated successfully");
//     } else {
//       // Document does not exist, create it with initial data
//       await setDoc(userDocRef, {
//         isOnline: status,
//         name: "Unknown",
//         lastMessage: "",
//       });
//       console.log("User document created and status set");
//     }
//   } catch (error) {
//     console.error("Error updating or creating user document:", error);
//   }
// };

// // Listen for authentication state changes (log in/out)
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, update their online status
//     const userId = user.uid;
//     updateUserStatus(userId, true); // Set the user as online
//   } else {
//     // User is signed out, set their status to offline
//     const userId = auth.currentUser?.uid;
//     if (userId) {
//       updateUserStatus(userId, false); // Set the user as offline if needed
//     }
//   }
// });

// // Export necessary Firebase functions and constants
// export { auth, googleProvider, facebookProvider, db, updateUserStatus };

//New code

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpR8pjfUxza301B5zqQVqDr1XrIe8j1XQ",
  authDomain: "chat-app-d18c2.firebaseapp.com",
  databaseURL: "https://chat-app-d18c2-default-rtdb.firebaseio.com",
  projectId: "chat-app-d18c2",
  storageBucket: "chat-app-d18c2.firebasestorage.app",
  messagingSenderId: "409837506937",
  appId: "1:409837506937:web:12768c8b363932946f1fa8",
  measurementId: "G-FKKPXQJF9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);

// Function to check and set user profile
const checkUserProfile = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    // User does not have a profile, set default profile information
    await setDoc(userDocRef, {
      name: user.displayName || "Unknown",
      email: user.email || "Unknown",
      isOnline: true,
      lastMessage: "",
    });
  } else {
    // Profile exists, just update the online status
    await updateDoc(userDocRef, { isOnline: true });
  }
};

// Listen for authentication state changes (log in/out)
onAuthStateChanged(auth, (user) => {
  if (user) {
    checkUserProfile(user); // Ensure user has a profile in Firestore
  } else {
    // User is signed out, set their status to offline
    const userId = auth.currentUser?.uid;
    if (userId) {
      updateUserStatus(userId, false); // Set the user as offline
    }
  }
});

// Function to update the user status in Firestore
const updateUserStatus = async (userId, status) => {
  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, { isOnline: status });
    console.log("User status updated successfully");
  } catch (error) {
    console.error("Error updating user status:", error);
  }
};

// Export necessary Firebase functions and constants
export { auth, googleProvider, facebookProvider, db, updateUserStatus };

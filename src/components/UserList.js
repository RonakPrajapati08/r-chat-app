// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig"; // Firebase Auth and Firestore
// import { collection, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate(); // React Router v6 hook for navigation

//   useEffect(() => {
//     // Listen for changes in the 'users' collection
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline); // Filter for users who are online

//       setUsers(onlineUsers);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Logout function
//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         // After logging out, redirect to login page (root path)
//         navigate("/", { replace: true }); // Using { replace: true } to prevent going back
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <h2>Chats</h2>
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{user.lastMessage || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}
//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

//This code is Talk to yourself is available feature

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import { collection, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline);

//       setUsers(onlineUsers);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigate("/", { replace: true });
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <h2>Chats</h2>
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{user.lastMessage || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}
//       <button className="logout-btn" onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

//this code is talk yourself not available

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the current user data
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//       }
//     };

//     fetchCurrentUser();

//     // Subscribe to the "users" collection to show online users
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigate("/", { replace: true });
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="fw-bold">Chats</h3>

//         {/* Display the current user's profile at the top */}
//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* Display online users */}
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{user.lastMessage || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}

//       <button
//         className="logout-btn position-absolute bottom-0"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

///Test Perpose code WIth login

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the current user data
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//       }
//     };

//     fetchCurrentUser();

//     // Subscribe to the "users" collection to show online users
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigate("/", { replace: true });
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="fw-bold">Chats</h3>

//         {/* Display the current user's profile at the top */}
//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* Display online users */}
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{user.lastMessage || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}

//       <button
//         className="logout-btn position-absolute bottom-0"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
//   query,
//   orderBy,
//   limit,
//   where,
// } from "firebase/firestore"; // Import where here
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const [lastMessages, setLastMessages] = useState({}); // Store last messages for each user
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the current user data
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//       }
//     };

//     fetchCurrentUser();

//     // Subscribe to the "users" collection to show online users
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//       fetchLastMessages(onlineUsers); // Fetch last messages when users are updated
//     });

//     return () => unsubscribe();
//   }, []);

//   // Fetch the last message for each user
//   const fetchLastMessages = (onlineUsers) => {
//     onlineUsers.forEach((user) => {
//       const q = query(
//         collection(db, "chats"),
//         orderBy("timestamp", "desc"),
//         limit(1),
//         where("userId", "in", [auth.currentUser.uid, user.id]),
//         where("senderId", "in", [auth.currentUser.uid, user.id])
//       );

//       onSnapshot(q, (snapshot) => {
//         const lastMessage = snapshot.docs[0]?.data()?.text || "No messages yet";
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: lastMessage,
//         }));
//       });
//     });
//   };

//   const logout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigate("/", { replace: true });
//       })
//       .catch((error) => {
//         console.error("Error during logout:", error);
//       });
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="fw-bold">Chats</h3>

//         {/* Display the current user's profile at the top */}
//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* Display online users */}
//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{lastMessages[user.id] || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//           ></span>
//         </div>
//       ))}

//       <button
//         className="logout-btn position-absolute bottom-0"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

// ChatList.js
// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   updateDoc,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const ChatList = ({ setSelectedUser }) => {
//   const [users, setUsers] = useState([]);
//   const [currentUserData, setCurrentUserData] = useState(null);
//   const [lastMessages, setLastMessages] = useState({});
//   const navigate = useNavigate();

//   // Function to update the user's online status
//   const updateUserStatus = async (status) => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       try {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         await updateDoc(userDocRef, { isOnline: status });
//       } catch (error) {
//         console.error("Error updating user status:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     // Fetch current user data and update the user status
//     const fetchCurrentUser = async () => {
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const userDocRef = doc(db, "users", currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
//         }
//         await updateUserStatus(true); // Set online when logged in
//       } else {
//         console.log("No user is currently logged in.");
//       }
//     };

//     fetchCurrentUser();

//     // Subscribe to the "users" collection to show online users
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const onlineUsers = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

//       setUsers(onlineUsers);
//       fetchLastMessages(onlineUsers);
//     });

//     // Set up listener for changes in authentication state
//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         updateUserStatus(true);
//         fetchCurrentUser();
//       } else {
//         setCurrentUserData(null);
//         navigate("/login"); // Redirect to login if logged out
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   // Fetch the last message for each user
//   const fetchLastMessages = async (onlineUsers) => {
//     for (const user of onlineUsers) {
//       const q = query(
//         collection(db, "chats"),
//         where("userId", "in", [auth.currentUser.uid, user.id]),
//         orderBy("timestamp", "desc"),
//         limit(1)
//       );

//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const lastMessage = querySnapshot.docs[0].data().text;
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: lastMessage,
//         }));
//       } else {
//         setLastMessages((prevMessages) => ({
//           ...prevMessages,
//           [user.id]: "No messages yet",
//         }));
//       }
//     }

//     const qRealTime = query(
//       collection(db, "chats"),
//       where("userId", "in", [auth.currentUser.uid]),
//       orderBy("timestamp", "desc")
//     );

//     onSnapshot(qRealTime, (snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         const { userId, text } = doc.data();
//         if (userId !== auth.currentUser.uid) {
//           setLastMessages((prevMessages) => ({
//             ...prevMessages,
//             [userId]: text,
//           }));
//         }
//       });
//     });
//   };

//   const logout = async () => {
//     try {
//       // Update user status to offline before signing out
//       await updateUserStatus(false);
//       await auth.signOut();
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="chat-list">
//       <div className="d-flex justify-content-between align-items-center">
//         <h3 className="fw-bold">Chats</h3>

//         {currentUserData && (
//           <div className="current-user-profile d-flex align-items-center">
//             <span
//               className={`status-indicator ${
//                 currentUserData.isOnline ? "online" : "offline"
//               }`}
//               style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 backgroundColor: currentUserData.isOnline ? "green" : "red",
//               }}
//             ></span>
//             <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
//           </div>
//         )}
//       </div>

//       <hr />

//       {users.map((user) => (
//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="chat-item"
//         >
//           <div className="chat-item-info">
//             <p>{user.name || "Unknown User"}</p>
//             <p>{lastMessages[user.id] || "No messages yet"}</p>
//           </div>
//           <span
//             className={`status ${user.isOnline ? "online" : "offline"}`}
//             style={{
//               width: "12px",
//               height: "12px",
//               borderRadius: "50%",
//               backgroundColor: user.isOnline ? "green" : "red",
//             }}
//           ></span>
//         </div>
//       ))}

//       <button
//         className="logout-btn position-absolute bottom-0"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ChatList;

//This is Updated Code This Error: Cannot read properties of null (reading 'uid') Solve.

import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
} from "firebase/firestore";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

const ChatList = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [lastMessages, setLastMessages] = useState({});
  const navigate = useNavigate();

  const updateUserStatus = async (status) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, { isOnline: status });
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCurrentUserData({ id: currentUser.uid, ...userDoc.data() });
        }
        await updateUserStatus(true);
      } else {
        console.log("No user is currently logged in.");
      }
    };

    fetchCurrentUser();

    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const onlineUsers = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.isOnline && user.id !== auth.currentUser?.uid);

      setUsers(onlineUsers);
      if (auth.currentUser) fetchLastMessages(onlineUsers);
    });

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        updateUserStatus(true);
        fetchCurrentUser();
      } else {
        setCurrentUserData(null);
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, [navigate]);

  const fetchLastMessages = async (onlineUsers) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return; // Exit if currentUser is null

    for (const user of onlineUsers) {
      const q = query(
        collection(db, "chats"),
        where("userId", "in", [currentUser.uid, user.id]),
        orderBy("timestamp", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const lastMessage = querySnapshot.docs[0].data().text;
        setLastMessages((prevMessages) => ({
          ...prevMessages,
          [user.id]: lastMessage,
        }));
      } else {
        setLastMessages((prevMessages) => ({
          ...prevMessages,
          [user.id]: "No messages yet",
        }));
      }
    }

    const qRealTime = query(
      collection(db, "chats"),
      where("userId", "in", [currentUser.uid]),
      orderBy("timestamp", "desc")
    );

    onSnapshot(qRealTime, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const { userId, text } = doc.data();
        if (userId !== currentUser.uid) {
          setLastMessages((prevMessages) => ({
            ...prevMessages,
            [userId]: text,
          }));
        }
      });
    });
  };

  const logout = async () => {
    try {
      await updateUserStatus(false);
      await auth.signOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="chat-list">
      <div className="d-flex justify-content-between align-items-center">
        {/* <h3 className="fw-bold">Chats</h3> */}
        <Col xs={6} md={4}>
          <Image className="w-50" src="./images/logo.png" roundedCircle />
        </Col>

        {currentUserData && (
          <div className="current-user-profile d-flex align-items-center">
            <span
              className={`status-indicator ${
                currentUserData.isOnline ? "online" : "offline"
              }`}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                marginRight: "8px",
                backgroundColor: currentUserData.isOnline ? "green" : "red",
              }}
            ></span>
            <h3 className="fw-bold mb-0">{currentUserData.name || "User"}</h3>
          </div>
        )}
      </div>

      <hr />

      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(user)}
          className="chat-item"
        >
          <div className="chat-item-info">
            <p>{user.name || "Unknown User"}</p>
            <p>{lastMessages[user.id] || "No messages yet"}</p>
          </div>
          <span
            className={`status ${user.isOnline ? "online" : "offline"}`}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: user.isOnline ? "green" : "red",
            }}
          ></span>
        </div>
      ))}

      <button
        className="logout-btn log-out position-absolute px-3 rounded-3 text-bg-danger"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default ChatList;

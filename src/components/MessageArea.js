// import React, { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import "../App.css";

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch messages from Firestore
//   useEffect(() => {
//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(snapshot.docs.map((doc) => doc.data()));
//     });

//     return () => unsubscribe();
//   }, [selectedUser]);

//   // Send message to Firestore
//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage(""); // Clear the message input after sending
//     }
//   };

//   // Handle "Enter" key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="message-area">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//         ))}
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyPress} // Handle Enter key press
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

// start Autoscroll funtionality add

// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import "../App.css";

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null); // Ref to track end of messages for auto-scroll

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!selectedUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => doc.data())
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser.uid)
//           )
//       );
//     });

//     return () => unsubscribe();
//   }, [selectedUser]);

//   // Auto-scroll to bottom when messages update or selected user changes
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, selectedUser]);

//   // Function to scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Send message to Firestore
//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage(""); // Clear the message input after sending
//     }
//   };

//   // Handle "Enter" key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="message-area">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//         ))}
//         {/* Empty div at the bottom to scroll into view */}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyPress} // Handle Enter key press
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

// UPDATED CODE start Autoscroll funtionality add

// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import { Dropdown } from "react-bootstrap"; // Import Bootstrap's Dropdown component
// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!selectedUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser.uid)
//           )
//       );
//     });

//     return () => unsubscribe();
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, selectedUser]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   // Clear chat function
//   const clearChat = async () => {
//     try {
//       // Query for messages between current user and selected user
//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       // Delete each message
//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]); // Clear messages from the state
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   return (
//     <div className="message-area">
//       {/* Top bar with three-dot dropdown menu */}
//       <div className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom">
//         <h2>Chat with {selectedUser?.name}</h2>

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-black fw-bold fs-5"
//           >
//             &#8942; {/* Three-dot icon */}
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {/* Messages display */}
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message input area */}
//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

//TYPING EFFECT ADD in THIS CODE UPDATED CODE But ERROR:- Cannot read properties of null (reading 'uid')

import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { Dropdown } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MessageArea = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch messages from Firestore
  useEffect(() => {
    if (!selectedUser) return;

    const q = query(collection(db, "chats"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (msg) =>
              (msg.senderId === auth.currentUser.uid &&
                msg.userId === selectedUser.id) ||
              (msg.senderId === selectedUser.id &&
                msg.userId === auth.currentUser.uid)
          )
      );
    });

    // Listen to typing status of the other user
    const typingStatusRef = doc(
      db,
      "typingStatus",
      `${selectedUser.id}_${auth.currentUser.uid}`
    );
    const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
      if (docSnap.exists()) {
        setOtherUserTyping(docSnap.data().isTyping);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeTyping();
    };
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, "chats"), {
        text: message,
        userId: selectedUser.id,
        senderId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });
      setMessage("");
      updateTypingStatus(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim()) {
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    // Update typing status if there is text in the input field
    if (e.target.value.trim()) {
      if (!isTyping) {
        updateTypingStatus(true);
      }
    } else {
      // If the message box is cleared, stop typing status
      updateTypingStatus(false);
    }
  };

  const updateTypingStatus = async (status) => {
    setIsTyping(status);
    const typingStatusRef = doc(
      db,
      "typingStatus",
      `${auth.currentUser.uid}_${selectedUser.id}`
    );
    await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
  };

  // Clear chat function
  const clearChat = async () => {
    try {
      const q = query(
        collection(db, "chats"),
        where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
        where("userId", "in", [auth.currentUser.uid, selectedUser.id])
      );
      const snapshot = await getDocs(q);

      const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(batchDelete);

      setMessages([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  return (
    <div className="message-area">
      {/* Top bar with three-dot dropdown menu */}
      <div className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom">
        <h2>Chat with {selectedUser?.name}</h2>

        <Dropdown align="end">
          <Dropdown.Toggle
            variant="button"
            bsPrefix="p-2"
            id="dropdown-basic"
            className="text-black fw-bold fs-5"
          >
            &#8942;
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Messages display */}
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === auth.currentUser.uid ? "sent" : "received"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      {otherUserTyping && (
        <div className="typing-indicator">The other user is typing...</div>
      )}

      {/* Message input area */}
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageArea;

//Cannot read properties of null (reading 'uid') ERROR Without Code

// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
//   deleteDoc,
//   where,
//   getDocs,
//   setDoc,
//   doc,
// } from "firebase/firestore";
// import { auth } from "../firebaseConfig";
// import { Dropdown } from "react-bootstrap";
// import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MessageArea = ({ selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Fetch messages from Firestore
//   useEffect(() => {
//     if (!selectedUser || !auth.currentUser) return;

//     const q = query(collection(db, "chats"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter(
//             (msg) =>
//               (msg.senderId === auth.currentUser.uid &&
//                 msg.userId === selectedUser.id) ||
//               (msg.senderId === selectedUser.id &&
//                 msg.userId === auth.currentUser.uid)
//           )
//       );
//     });

//     // Listen to typing status of the other user
//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${selectedUser.id}_${auth.currentUser.uid}`
//     );
//     const unsubscribeTyping = onSnapshot(typingStatusRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOtherUserTyping(docSnap.data().isTyping);
//       }
//     });

//     return () => {
//       unsubscribe();
//       unsubscribeTyping();
//     };
//   }, [selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (message.trim()) {
//       await addDoc(collection(db, "chats"), {
//         text: message,
//         userId: selectedUser.id,
//         senderId: auth.currentUser.uid,
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//       updateTypingStatus(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && message.trim()) {
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     // Update typing status if there is text in the input field
//     if (e.target.value.trim()) {
//       if (!isTyping) {
//         updateTypingStatus(true);
//       }
//     } else {
//       // If the message box is cleared, stop typing status
//       updateTypingStatus(false);
//     }
//   };

//   const updateTypingStatus = async (status) => {
//     setIsTyping(status);
//     const typingStatusRef = doc(
//       db,
//       "typingStatus",
//       `${auth.currentUser.uid}_${selectedUser.id}`
//     );
//     await setDoc(typingStatusRef, { isTyping: status }, { merge: true });
//   };

//   // Clear chat function
//   const clearChat = async () => {
//     try {
//       const q = query(
//         collection(db, "chats"),
//         where("senderId", "in", [auth.currentUser.uid, selectedUser.id]),
//         where("userId", "in", [auth.currentUser.uid, selectedUser.id])
//       );
//       const snapshot = await getDocs(q);

//       const batchDelete = snapshot.docs.map((doc) => deleteDoc(doc.ref));
//       await Promise.all(batchDelete);

//       setMessages([]);
//     } catch (error) {
//       console.error("Error clearing chat:", error);
//     }
//   };

//   return (
//     <div className="message-area">
//       <div className="chat-top-bar d-flex justify-content-between align-items-center p-2 border-bottom">
//         <h2>Chat with {selectedUser?.name}</h2>

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="button"
//             bsPrefix="p-2"
//             id="dropdown-basic"
//             className="text-black fw-bold fs-5"
//           >
//             &#8942;
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={clearChat}>Clear Chat</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === auth.currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {otherUserTyping && (
//         <div className="typing-indicator">The other user is typing...</div>
//       )}

//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyPress}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;

// // SignUp.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebaseConfig";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       // Create user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Update profile with display name
//       await updateProfile(user, { displayName: name });

//       // Store additional user info in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         name,
//         phone,
//         email,
//         isOnline: true,
//       });

//       // Log the user out after successful signup
//       await auth.signOut();

//       // Redirect to LoginPage after successful signup
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Sign Up</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSignUp}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>
//         Already have an account? <a href="/">Login here</a>
//       </p>
//     </div>
//   );
// };

// export default SignUp;

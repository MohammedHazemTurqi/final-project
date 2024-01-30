import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import { useAppStore } from "./store";
import { io } from "socket.io-client";

function ProtectedRoute({ comp }) {
  const { isLogin, setIsLogin } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("aonToken");
    if (token) setIsLogin(true);
    else setIsLogin(true);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading . . .</div>;

  return isLogin ? comp : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgRec, setMsgRec] = useState("");
  const [msgList, setMsgList] = useState([]);

  var socket = io("http://localhost:3000", {
    autoConnect: true,
  });

  useEffect(() => {
    let onConnect = () => {
      console.log("Connected");
    };

    let onEmit = (arg) => {
      setMsgRec(arg);
    };

    socket.on("reciveMsg", onEmit);
    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("reciveMsg", onEmit);
    };
  }, []);

  useEffect(() => {
    if (msgRec) setMsgList([...msgList, msgRec]);
  }, [msgRec]);

  const handleSend = () => {
    socket.emit("message", msg);
    setMsg("");
  };

  const handleLogin = (email, password) => {
    // Validate the email and password
    if (email === 'user@example.com' && password === 'password') {
      // Set the authentication status to true
      setIsAuthenticated(true);
    } else {
      // Display an error message
      alert('Invalid email or password');
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute comp={<HomePage />} />} />
        <Route path="/Men" element={<ProtectedRoute comp={<Men />} />} />
        <Route path="/Women" element={<ProtectedRoute comp={<Women />} />} />
        <Route path="/Kids" element={<ProtectedRoute comp={<Kids />} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      </Routes>

      <div>
        <p>Message</p>
        <ul>
          {msgList.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </ul>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
    </BrowserRouter>
  );
}

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default App;

// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import Men from './pages/Men';
// import Women from './pages/Women';
// import Kids from './pages/Kids';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = (email, password) => {
//     // Validate the email and password
//     if (email === 'user@example.com' && password === 'password') {
//       // Set the authentication status to true
//       setIsAuthenticated(true);
//     } else {
//       // Display an error message
//       alert('Invalid email or password');
//     }
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/Men" element={<Men/>} />
//         <Route path="/Women" element={<Women/>} />
//         <Route path="/Kids" element={<Kids />} />
//         <Route path="/login" element={<Login handleLogin={handleLogin} />} />
//         {isAuthenticated && (
//           <>
//             <Route path="/" element={<HomePage />} />
//             {/* <Route path="/profile" element={<ProfilePage />} /> */}
//           </>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function Login({ handleLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleLogin(email, password);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </label>
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default App;

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = (email, password) => {
//     // Validate the email and password
//     if (email === 'user@example.com' && password === 'password') {
//       // Set the authentication status to true
//       setIsAuthenticated(true);
//     } else {
//       // Display an error message
//       alert('Invalid email or password');
//     }
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/Men" element={<Men/>} />
//         <Route path="/Women" element={<Women/>} />
//         <Route path="/Kids" element={<Kids />} />
//         <Route path="/login" element={<Login handleLogin={handleLogin} />} />
//         {isAuthenticated && (
//           <>
//             <Route path="/" element={<HomePage  />} />
//             {/* <Route path="/profile" element={<ProfilePage />} /> */}
//           </>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function App() {
//  return (
//     <BrowserRouter>
   
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/Men" element={<Men/>} />
//         <Route path="/Women" element={<Women/>} />
//         <Route path="/Kids" element={<Kids />} />
//       </Routes>
//     </BrowserRouter>
    
//  );
// }

// export default App;
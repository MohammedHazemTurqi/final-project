import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import Header from "../Components/Header/header";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useAppStore();

  const handleLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username,
      password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:3000/api/v1/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setIsLogin(true);
          localStorage.setItem("aonToken", result.token);
          navigate("/");
        } else {
          alert(result.msg);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="login-screen">
         
      <div className="form">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import "./Login.css";
// 
// function Login({ handleLogin }) {

// const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//      handleLogin(email, password);
//     // Handle login logic here
//   }
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
//     <div>
//      
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
//     </div>
//   );
// }

// export default Login;


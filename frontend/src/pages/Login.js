import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5123/login', { username, password });
      const { user_id } = res.data; // Get user_id from response
      if (user_id) {
        localStorage.setItem('user_id', user_id); // Store user_id in localStorage
        alert('Login successful');
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
      setIsLoggedIn(false);
    }
  };
  
  

  return (
    <div className="login-container">
      {/* Back button */}
      <Link to="/" className="login-back-button">← Back</Link>

      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>

        {isLoggedIn && <Link to="/addtask" className="start-link">Let's Start</Link>}
      </div>
    </div>
  );
};

export default Login;

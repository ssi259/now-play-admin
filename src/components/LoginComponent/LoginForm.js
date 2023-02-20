import React, { useState } from 'react';
import './LoginForm.css';
export const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onLogin({ username, password });
    };
  
    return (
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='username' >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='password'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id = "submit" type="submit">Login</button>
      </form>
    );
}
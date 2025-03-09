import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({ username: '', password: '', role: 'user' });

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', user);
      alert("Registration successful! Please login.");
      window.location.href = '/login';
    } catch {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={e => setUser({...user, username: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setUser({...user, password: e.target.value})} />
      <select onChange={e => setUser({...user, role: e.target.value})}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Register;

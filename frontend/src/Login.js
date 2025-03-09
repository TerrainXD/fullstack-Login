import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => setIsGoogleScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script on unmount
    };
  }, []);

  useEffect(() => {
    if (isGoogleScriptLoaded) {
      // Initialize Google Sign-In only after the script is loaded
      window.google.accounts.id.initialize({
        client_id: process.env.Google_Auth, 
        callback: handleGoogleLogin,
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('google-button'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, [isGoogleScriptLoaded]);

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/login', user);
      // Get JWT token 
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch {
      alert('Login failed');
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const { data } = await axios.post('http://localhost:5000/google-login', {
        token: response.credential, // Google ID Token
      });
      // Get JWT token
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch {
      alert('Google login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        value={user.username}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        value={user.password}
      />
      <button onClick={handleLogin}>Login</button>

      <div id="google-button" style={{ marginTop: '20px' }}></div>

      {/* Google login script is loaded dynamically */}
    </div>
  );
}

export default Login;

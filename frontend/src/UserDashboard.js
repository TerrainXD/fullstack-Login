import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation
import { jwtDecode } from 'jwt-decode'; // JWT decoding to verify token

function UserDashboard() {
  const navigate = useNavigate(); // Initialize navigate hook for redirection

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token found, redirect to login
      navigate('/login');
    } else {
      try {
        // Verify token (decode and check expiration if needed)
        jwtDecode(token);
      } catch (error) {
        // If token is invalid, redirect to login
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome User! You have basic access.</p>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}

export default UserDashboard;

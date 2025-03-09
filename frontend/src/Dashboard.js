import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate is the correct hook for navigation
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // Create a navigate object for navigation

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the JWT token to extract the role
        const decoded = jwtDecode(token);
        setRole(decoded.role);

        // Redirect based on the role using navigate
        if (decoded.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (decoded.role === 'manager') {
          navigate('/manager-dashboard');
        } else if (decoded.role === 'user') {
          navigate('/user-dashboard');
        }
      } catch (error) {
        console.error("Invalid token", error);
        handleLogout();
      }
    } else {
      window.location.href = '/login'; // Redirect to login if no token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <h2>Loading Dashboard...</h2>
      {/* Optionally display loading text until redirected */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

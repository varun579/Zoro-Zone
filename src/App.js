// src/App.js (Main Application file)
import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import Dashboard from './screens/Dashboard';
// import AdminSignup from './components/AdminSignup'; // You can build this next

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // In a real app, you'd verify the token with the server here.
      // For simplicity, we just check for its existence.
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading app...</div>;
  }
  
  // Basic routing based on authentication status
  if (!isAuthenticated) {
    // Show Login page if not authenticated
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    
    // If you add a proper router, you would handle the /signup path here:
    // <Route path="/signup" element={<AdminSignup />} />
  }

  // Show Dashboard if authenticated
  return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
}

export default App;
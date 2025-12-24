import React, { useEffect, useState } from 'react';
import AdminLogin from './components/AdminLogin';
import Dashboard from './screens/Dashboard';
import RegistrationDashboard from './screens/RegistrationDashboard';
import PlayersDashboard from './screens/PlayersDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('register');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <Dashboard
        onLogout={() => {
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }}
        setView={setView}
      />

      {view === 'register' && <RegistrationDashboard />}
      {view === 'players' && <PlayersDashboard />}
    </>
  );
}

export default App;

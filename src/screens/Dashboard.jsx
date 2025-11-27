// src/screens/Dashboard.js
import React, { useState } from 'react';
import PlayerList from '../components/PlayerList';
import RegistrationForm from '../components/RegistrationForm';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap'; // Import Bootstrap components

const Dashboard = ({ onLogout }) => {
  const [refreshKey, setRefreshKey] = useState(0); 
  
  const handleRegistrationSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1); 
    alert('Player registered successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand href="#">ZORONONE Registration Dashboard</Navbar.Brand>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Registration Form (Takes full width on small screens, 4/12 on medium/large) */}
          <Col lg={4} md={12} className="mb-4">
            <h3 className="mb-3">⚽ New Player Registration</h3>
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
          </Col>
          
          {/* Player List (Takes full width on small screens, 8/12 on medium/large) */}
          <Col lg={8} md={12}>
            <h3 className="mb-3">📋 Existing Players</h3>
            <PlayerList key={refreshKey} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
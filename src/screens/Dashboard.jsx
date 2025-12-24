import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Dashboard = ({ onLogout, setView }) => {
  return (
    <Navbar
      expand="lg"
      className="bg-primary-green shadow-sm"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand className="fw-bold text-white">
          ZORONONE Admin
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar" />
        <Navbar.Collapse id="admin-navbar">
          <Nav className="me-auto">
            <Nav.Link
              className="text-white fw-semibold"
              onClick={() => setView('register')}
            >
              Registration
            </Nav.Link>

            <Nav.Link
              className="text-white fw-semibold"
              onClick={() => setView('players')}
            >
              Players
            </Nav.Link>
          </Nav>

          <Button
            variant="light"
            className="fw-semibold"
            onClick={onLogout}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Dashboard;

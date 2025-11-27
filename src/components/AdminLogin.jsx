// src/components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'; // Import Bootstrap components

const API_URL = 'http://localhost:5001/api';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        username,
        password,
      });

      localStorage.setItem('adminToken', response.data.token);
      onLogin(); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check server connection.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        {/* The column will take 6 units on medium screens and 8 on small screens */}
        <Col md={6} sm={8}>
          <Card className="shadow">
            <Card.Header className="text-center bg-dark text-white">
              <h2>ZORONONE Admin Login</h2>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Log In
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
                <p className="mb-0 text-muted">Need an account? <a href="/signup">Sign Up</a></p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
// src/components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const API_URL = 'https://zoro-zone-backend.onrender.com/api';


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
        <Col md={6} sm={8}>
          <Card className="shadow">
            
            {/* HEADER */}
            <Card.Header className="text-center bg-primary-green text-white">
              <h2>ZOROZONE Admin Login</h2>
            </Card.Header>

            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label className="text-primary-green">
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label className="text-primary-green">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* BUTTON */}
                <Button type="submit" className="btn-primary-green w-100 mt-3">
                  Log In
                </Button>
              </Form>
            </Card.Body>

            {/* FOOTER */}
            <Card.Footer className="text-center">
              <p className="mb-0 text-muted">
                Need an account? <a href="/signup" className="text-primary-green">Sign Up</a>
              </p>
            </Card.Footer>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;

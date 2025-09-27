// frontend/src/pages/RegistrationPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function RegistrationPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/register/', formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed!', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-4 h2">Register</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationPage;
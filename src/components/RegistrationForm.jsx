// src/components/RegistrationForm.js

import React, { useState } from 'react';
import authAxios from '../api/axios';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap'; 

// Initialize state to match all schema fields
const INITIAL_STATE = {
    fullName: '', 
    dateOfBirth: '', 
    gender: '', 
    nationality: '', 
    city: '', 
    postalCode: '', 
    residentialAddress: '', 
    parentGuardianName: '', 
    contactNumber: '', 
    allergies: '', 
    relationshipToPlayer: '', 
    emailAddress: '', 
    emergencyConditions: '', 
    emergencyContactNumber: '', 
    bloodType: '', 
    physicianName: '', 
    physicianContactNumber: '', 
    allowPromotionalMedia: false, 
    isPaid: false
};

const RegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Format dateOfBirth for MongoDB (ensures it's a valid ISO string)
    const submissionData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
    };

    try {
      await authAxios.post('/users', submissionData);
      setFormData(INITIAL_STATE); // Clear form on success
      onSuccess(); // Trigger dashboard refresh
    } catch (err) {
      // Catch specific backend error messages
      setError(err.response?.data?.message || 'Registration failed. Please check all required fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-3 shadow-sm">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* ======================================= */}
        {/* PERSONAL DETAILS              */}
        {/* ======================================= */}
        <fieldset className="mb-4 p-3 border rounded">
          <legend className="h5 text-primary">Personal Details</legend>
          <Form.Group className="mb-3">
            <Form.Label>Full Name*</Form.Label>
            <Form.Control name="fullName" type="text" value={formData.fullName} onChange={handleChange} required />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Date of Birth*</Form.Label>
              <Form.Control name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
            </Form.Group>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Gender*</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Nationality</Form.Label>
              <Form.Control name="nationality" type="text" value={formData.nationality} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>City / Postal Code</Form.Label>
              <Row>
                <Col><Form.Control name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} /></Col>
                <Col><Form.Control name="postalCode" type="text" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} /></Col>
              </Row>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Residential Address</Form.Label>
            <Form.Control name="residentialAddress" type="text" value={formData.residentialAddress} onChange={handleChange} />
          </Form.Group>
        </fieldset>

        {/* ======================================= */}
        {/* PARENT/GUARDIAN INFORMATION       */}
        {/* ======================================= */}
        <fieldset className="mb-4 p-3 border rounded">
          <legend className="h5 text-primary">Parent/Guardian Information</legend>
          <Form.Group className="mb-3">
            <Form.Label>Guardian Name*</Form.Label>
            <Form.Control name="parentGuardianName" type="text" value={formData.parentGuardianName} onChange={handleChange} required />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Contact Number*</Form.Label>
              <Form.Control name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} required />
            </Form.Group>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Email Address*</Form.Label>
              <Form.Control name="emailAddress" type="email" value={formData.emailAddress} onChange={handleChange} required />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Relationship to Player</Form.Label>
            <Form.Control name="relationshipToPlayer" type="text" value={formData.relationshipToPlayer} onChange={handleChange} />
          </Form.Group>
        </fieldset>

        {/* ======================================= */}
        {/* MEDICAL DETAILS               */}
        {/* ======================================= */}
        <fieldset className="mb-4 p-3 border rounded">
          <legend className="h5 text-primary">Medical & Emergency</legend>
          <Row>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control name="emergencyContactNumber" type="tel" value={formData.emergencyContactNumber} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Blood Type (Optional)</Form.Label>
              <Form.Control name="bloodType" type="text" value={formData.bloodType} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Allergies (if any)</Form.Label>
            <Form.Control name="allergies" type="text" value={formData.allergies} placeholder="e.g., Peanuts, Penicillin" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Emergency Conditions (e.g., Asthma, Diabetes)</Form.Label>
            <Form.Control name="emergencyConditions" type="text" value={formData.emergencyConditions} onChange={handleChange} />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Physician Name</Form.Label>
              <Form.Control name="physicianName" type="text" value={formData.physicianName} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md={6} className="mb-3">
              <Form.Label>Physician Contact Number</Form.Label>
              <Form.Control name="physicianContactNumber" type="tel" value={formData.physicianContactNumber} onChange={handleChange} />
            </Form.Group>
          </Row>
        </fieldset>

        {/* ======================================= */}
        {/* DECLARATION / ADMIN           */}
        {/* ======================================= */}
        <div className="mb-4 p-3 border rounded bg-light">
            <h6 className="text-secondary">Declaration & Admin Status</h6>
            <Form.Group className="mb-2">
            <Form.Check 
                type="checkbox"
                label="Allow promotional media (Photos/Videos)"
                name="allowPromotionalMedia"
                checked={formData.allowPromotionalMedia}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Group>
            <Form.Check 
                type="checkbox"
                label="Registration Paid (Admin Only)"
                name="isPaid"
                checked={formData.isPaid}
                onChange={handleChange}
            />
            </Form.Group>
        </div>

        <Button variant="success" type="submit" disabled={loading} className="w-100 mt-3">
          {loading ? 'Registering...' : 'Register Player'}
        </Button>
        <p className="mt-2 text-muted text-center"><small>* denotes a required field.</small></p>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
import React from 'react';
import { Container } from 'react-bootstrap';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationDashboard = () => {

  // Called after successful registration
  const handleSuccess = () => {
    alert('Player registered successfully');
    // later you can refresh list / redirect / etc.
  };

  return (
    <Container className="mt-4">
      <h3 className="text-primary-green mb-3">
        Registered Players
      </h3>

      <RegistrationForm onSuccess={handleSuccess} />
    </Container>
  );
};

export default RegistrationDashboard;

import React from 'react';
import { Container } from 'react-bootstrap';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationDashboard = () => {
  return (
    <Container className="mt-4">
      <h3 className="text-primary-green mb-3">
        Player Registration
      </h3>

      <RegistrationForm onSuccess={() => {}} />
    </Container>
  );
};

export default RegistrationDashboard;

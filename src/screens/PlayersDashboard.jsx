import React from 'react';
import { Container } from 'react-bootstrap';
import PlayerList from '../components/PlayerList';

const PlayersDashboard = () => {
  return (
    <Container className="mt-4">
      <h3 className="text-primary-green mb-3">
        Registered Players
      </h3>

      <PlayerList />
    </Container>
  );
};

export default PlayersDashboard;

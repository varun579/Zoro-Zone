// src/components/PlayerList.js
import React, { useState, useEffect } from 'react';
import authAxios from '../api/axios';
import { Table, Spinner, Alert, Card } from 'react-bootstrap'; // Import Bootstrap components

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await authAxios.get('/users');
        setPlayers(response.data);
      } catch (err) {
        setError('Failed to fetch players. Check if the admin token is valid.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (loading) return <div className="text-center my-4"><Spinner animation="border" /> <p>Loading players...</p></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (players.length === 0) return <Alert variant="info">No players registered yet.</Alert>;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        {/* Makes the table horizontally scrollable on small devices */}
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Guardian</th>
                <th>Contact #</th>
                <th>Email</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player._id}>
                  <td>{player.fullName}</td>
                  <td>{new Date(player.dateOfBirth).toLocaleDateString()}</td>
                  <td>{player.parentGuardianName}</td>
                  <td>{player.contactNumber}</td>
                  <td>{player.emailAddress}</td>
                  <td>{player.isPaid ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlayerList;
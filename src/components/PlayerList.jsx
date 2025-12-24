import React, { useEffect, useState } from 'react';
import authAxios from '../api/axios';
import { Table, Button, Form, Alert, Modal } from 'react-bootstrap';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const [showEdit, setShowEdit] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await authAxios.get('/users');
      setPlayers(res.data);
    } catch {
      setError('Failed to load players');
    }
  };

  // =====================
  // DELETE PLAYER
  // =====================
  const deletePlayer = async (id) => {
    if (!window.confirm('Delete this player?')) return;

    await authAxios.delete(`/users/${id}`);
    setPlayers(players.filter(p => p._id !== id));
  };

  // =====================
  // TOGGLE PAYMENT
  // =====================
  const togglePayment = async (player) => {
    const updated = await authAxios.patch(`/users/${player._id}`, {
      isPaid: !player.isPaid
    });

    setPlayers(players.map(p =>
      p._id === player._id ? updated.data : p
    ));
  };

  // =====================
  // OPEN EDIT MODAL
  // =====================
  const openEdit = (player) => {
    setEditingPlayer({ ...player });
    setShowEdit(true);
  };

  // =====================
  // SAVE EDIT
  // =====================
  const saveEdit = async () => {
    const res = await authAxios.patch(
      `/users/${editingPlayer._id}`,
      editingPlayer
    );

    setPlayers(players.map(p =>
      p._id === editingPlayer._id ? res.data : p
    ));

    setShowEdit(false);
  };

  const filteredPlayers = players.filter(p =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.emailAddress.toLowerCase().includes(search.toLowerCase())
  );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <Form.Control
        placeholder="Search by name or email"
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPlayers.map(player => (
            <tr key={player._id}>
              <td>{player.fullName}</td>
              <td>{player.emailAddress}</td>
              <td>{player.contactNumber}</td>

              <td>
                <Button
                  size="sm"
                  className="btn-primary-green"
                  onClick={() => togglePayment(player)}
                >
                  {player.isPaid ? 'Paid' : 'Unpaid'}
                </Button>
              </td>

              <td>
                <Button
                  size="sm"
                  className="btn-primary-green me-2"
                  onClick={() => openEdit(player)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deletePlayer(player._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* =====================
          EDIT MODAL
      ===================== */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Player</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {editingPlayer && (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  value={editingPlayer.fullName}
                  onChange={(e) =>
                    setEditingPlayer({
                      ...editingPlayer,
                      fullName: e.target.value
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={editingPlayer.emailAddress}
                  onChange={(e) =>
                    setEditingPlayer({
                      ...editingPlayer,
                      emailAddress: e.target.value
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  value={editingPlayer.contactNumber}
                  onChange={(e) =>
                    setEditingPlayer({
                      ...editingPlayer,
                      contactNumber: e.target.value
                    })
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>

          <Button className="btn-primary-green" onClick={saveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PlayerList;

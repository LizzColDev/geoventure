import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { createUser } from '../../../services/userService';
import { createGame } from '../../../services/gameService';
import { GameData } from '../../../types/types';
import CustomButton from '../../common/CustomButton/CustomButton';
import ModalMessage from '../../common/ModalMessage/ModalMessage';
import './UserNameInput.css';

interface UsernameInputProps {
  onGameAvailable: (gameData: GameData, userName: string) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ onGameAvailable }) => {
  // State for storing the username
  const [username, setUsername] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if username is not empty
    if (!username.trim()) {
      setShowModal(true);
      return;
    }

    try {
      // Create new user
      const newUser = await createUser({ name: username });

      // If user creation is successful
      if (newUser) {
        // Create game for the new user
        const gameData = await createGame(newUser.id);
        // Call parent component function with game data and username
        onGameAvailable(gameData, newUser.name);
        // Reset username input field
        setUsername('');
      } else {
        throw new Error('Failed to create user.');
      }
    } catch (error) {
      // Log and alert if there's an error creating user or game
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group className="mb-3" controlId="nameUser">
          <Form.Label className="form-label">Enter Your Name or Nickname:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Name or Nickname here..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </Form.Group>
        <CustomButton variant="primary" type="submit">
          Start Playing!
        </CustomButton>
      </Form>
      <ModalMessage
        show={showModal}
        message="Please enter a valid name."
        onHide={() => setShowModal(false)}
        onExit={() => setShowModal(false)}
      />
  </>
  );
};

export default UsernameInput;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUser } from '../../../services/userService';
import { createGame } from '../../../services/gameService';
import { GameData } from '../../../types/types';

interface UsernameInputProps {
  onGameAvailable: (gameData: GameData, userName: string) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ onGameAvailable }) => {
  // State for storing the username
  const [username, setUsername] = useState<string>('');

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if username is not empty
    if (!username.trim()) {
      alert('Please enter a valid name.');
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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nameUser">
          <Form.Label>What's Your Name?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name here..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Start Playing!
        </Button>
      </Form>
  );
};

export default UsernameInput;

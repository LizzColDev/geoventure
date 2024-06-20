import React, { useEffect, useState } from 'react';
import {Card} from 'react-bootstrap';
import { Coordinates, GameData } from '../../../types/types';
import { createGame, deleteGame, updateGame } from '../../../services/gameService';
import { deleteUser } from '../../../services/userService';
import { initGoogleMaps } from '../../../services/externalAPIs/googleMapsService';
import './GameComponents.css'
import GuessFooter from '../../UI/GuessFooter/GuessFooter';
import ModalMessage from '../../common/ModalMessage/ModalMessage';

interface GuessLocationPageProps {
  gameData: GameData;
  onUpdateGameData: (updatedGameData: GameData) => void;
}

const GuessLocationPage: React.FC<GuessLocationPageProps> = ({ gameData, onUpdateGameData }) => {
  const [initialLocation, setInitialLocation] = useState<Coordinates>(gameData.streetViewInfo.initialLocation);
  const [guessedLocation, setGuessedLocation] = useState<Coordinates | null>(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Function to load the map and panorama
    const loadMap = async () => {
      // Initialize Google Maps API
      const { googleMaps } = await initGoogleMaps();
      const { Map, StreetViewPanorama } = googleMaps;

      // Create map instance
      const mapInstance = new Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 28.17613436963845, lng: -10.684843766854517 },
        zoom: 1,
        streetViewControl: false,
        draggableCursor: 'crosshair',
      });

      // Create panorama instance
      const panoramaInstance = new StreetViewPanorama( document.getElementById('pano') as HTMLElement, {
        position: { lat: initialLocation.latitude, lng: initialLocation.longitude },
        pov: { heading: 34, pitch: 4 },
        addressControl: false,
      });

      // Set panorama to map
      mapInstance.setStreetView(panoramaInstance);

      // Add click event listener to map
      mapInstance.addListener('click', handleMapClick);
    };
    
    // Event listener for map click
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
      // Get latitude and longitude from click event
      const latitude = event.latLng?.lat() ?? 0;
      const longitude = event.latLng?.lng() ?? 0;

      setGuessedLocation({ latitude, longitude });
    };

    loadMap();

    // Clean up function
    return () => { };
  }, [initialLocation]);

  // Function to handle the guess
  const handleGuess = async () => {
    if (!guessedLocation) return;

      // Update game data with guessed location
      const updatedGame: Partial<GameData> = {
        id: gameData.id,
        guessedLocation,
      };

      // Update game
      const response = await updateGame(updatedGame as GameData);
      
      if (response.isGuessCorrect && response.streetViewInfo) {
        // Increase correct guess count
        setCorrectGuesses(prev => prev + 1);
        
        // If correct guesses reach 5, show congratulatory message
        if (correctGuesses + 1 === 5) {
          setModalMessage('Congratulations! You passed to the next level!');
          setShowModal(true);
        }

        // Update game data and initial location
        setInitialLocation(response.streetViewInfo.initialLocation);
        onUpdateGameData(response); 
      } else {
        // If guess is incorrect, show error message
        setModalMessage('Sorry, your guess was incorrect. Try again!');
        setShowModal(true);
        setCorrectGuesses(0); // Reset correct guess count
      }
  };

 // Function to handle modal action
  const handleModalAction = async (action: string) => {
    setShowModal(false); // Close the modal
    if (action === 'continuePlaying') {
      console.log("correctgessw; ", correctGuesses)
      if (correctGuesses === 0) {
        await deleteGame(gameData.id); // Delete the existing game

        // Create a new game for the same user
        const newGame = await createGame(gameData.userId);

        // Update the game data with the new game
        onUpdateGameData(newGame);
        // Reset correct guess count and show first image
        setCorrectGuesses(0);
        setInitialLocation(newGame.streetViewInfo.initialLocation);
      } else {
        // Continue to the next level
        setInitialLocation(gameData.streetViewInfo.initialLocation);
        setCorrectGuesses(1);
      }
    } else if (action === 'exit') {
      await deleteGame(gameData.id); // Delete the existing game
      await deleteUser(gameData.userId); // Delete the user data
      // Redirect to the initial page
      window.location.href = '/';
    }
  };

  return (
    <Card >
      {initialLocation && (
        <div className="position-relative game-play-input-container">
          <div id="pano" className="position-absolute pano-container">
            <div id="map" className="position-absolute map-container "></div>
          </div>
          <GuessFooter handleGuess={handleGuess}/>
        </div>
      )}
      <ModalMessage
        show={showModal}
        message={modalMessage}
        onHide={() => setShowModal(false)}
        onContinue={() => handleModalAction('continuePlaying')}
        onExit={() => handleModalAction('exit')}
        showContinueButton={true}
      />
    </Card>
  );
}

export default GuessLocationPage;

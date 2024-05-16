import React, { useEffect, useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import { Coordinates, GameData, StreetViewInfo } from '../../../types/types';
import { updateGame } from '../../../services/gameService';
import { initGoogleMaps } from '../../../services/externalAPIs/googleMapsService';
import './GameComponents.css'

const GuessLocationPage: React.FC<{gameData: GameData}> = ({ gameData }) => {
  const { initialLocation } = gameData.streetViewInfo as StreetViewInfo;
  const [guessedCoordinate, setGuessedCoordinate] = useState< Coordinates | null>(null);

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
      });

      // Create panorama instance
      const panoramaInstance = new StreetViewPanorama( document.getElementById('pano') as HTMLElement, {
        position: { lat: initialLocation.latitude, lng: initialLocation.longitude },
        pov: { heading: 34, pitch: 10 },
        addressControl: false,
      });

      // Set panorama to map
      mapInstance.setStreetView(panoramaInstance);

      const handleMapClick = (event: google.maps.MapMouseEvent) => {
        // Get latitude and longitude from click event
        const latitude = event.latLng?.lat() ?? 0;
        const longitude = event.latLng?.lng() ?? 0;

        setGuessedCoordinate({ latitude, longitude })
      }

      // Add click event listener to map
      mapInstance.addListener('click', handleMapClick);
    };
    loadMap();

    // Clean up function
    return () => { };

  }, [initialLocation.latitude, initialLocation.longitude]);


  const handleGuess = async () => {
    if (guessedCoordinate) {
      // Update game data with guessed location
      const updatedGame: Partial<GameData> = {
        id: gameData.id,
        guessedLocation: guessedCoordinate
      };
      // Update game
      await updateGame(updatedGame as GameData);
    }
  };

  return (
    <Card >
      {initialLocation && (
        <div className="position-relative game-play-input-container">
          <div id="pano" className="position-absolute pano-container">
            <div id="map" className="position-absolute map-container "></div>
          </div>
          <Button className="position-absolute guess-button" onClick={handleGuess}>
            Guess
          </Button>
        </div>
      )}
    </Card>
  );
}

export default GuessLocationPage;

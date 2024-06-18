import React, { useState } from 'react';
import { GameData } from './types/types';
import UsernameInput from './components/pages/UserComponents/UserNameInput';
import GuessLocationPage from './components/pages/GameComponents/GuessLocationPage';
import GeoVentureNavBar from './components/common/GeoVentureNavBar/GeoVentureNavBar';

const App: React.FC = () => {

  const [gameData, setGameData] = useState<GameData | null>(null);
  const [usernameInputVisible, setUsernameInputVisible] = useState<boolean>(true);
  
  const handleGameAvailable = (gameData: GameData, userData: string) => {
    setGameData(gameData);
    console.log(userData)
    setUsernameInputVisible(false)
  };

    const handleUpdateGameData = (updatedGameData: GameData) => {
    setGameData(updatedGameData);
  };

  return (
    <div className="App">
      <GeoVentureNavBar gameData={gameData} />
      {usernameInputVisible && <UsernameInput onGameAvailable={handleGameAvailable} />}
      {gameData && (
        <GuessLocationPage gameData={gameData}  onUpdateGameData={handleUpdateGameData}/>
      )}
    </div>
    
  );
};

export default App


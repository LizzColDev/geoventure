import React, { useState } from 'react';
import { GameData } from './types/types';
import UsernameInput from './components/pages/UserComponents/UserNameInput';
import GuessLocationPage from './components/pages/GameComponents/GuessLocationPage';
import GeoVentureNavBar from './components/common/GeoVentureNavBar/GeoVentureNavBar';
import ResultPage from './components/pages/GameComponents/ResultGamePage';
import { createGame, deleteGame } from './services/gameService';
import { deleteUser } from './services/userService';

const App: React.FC = () => {

  const [gameData, setGameData] = useState<GameData | null>(null);
  const [usernameInputVisible, setUsernameInputVisible] = useState<boolean>(true);
  const [showResultPage, setShowResultPage] = useState<boolean>(false);
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);
  
  const handleGameAvailable = (gameData: GameData) => {
    setGameData(gameData);
    setUsernameInputVisible(false)
  };

  const handleUpdateGameData = (updatedGameData: GameData) => {
    
    setGameData(updatedGameData);
    if (updatedGameData.gamesWon === 9) {
      handleGameEnd(updatedGameData.gamesWon);
    }
  };
  
  const handleGameEnd = (correctGuesses: number) => {
    setCorrectGuesses(correctGuesses);
    setShowResultPage(true);
  };

  const handlePlayAgain = async () => {
    // Reset the game and start a new one
    if (gameData) {
      const newGame = await createGame(gameData.userId);
      setGameData(newGame);
      setShowResultPage(false);
      setCorrectGuesses(0);
    }
  };

  const handleExit = async () => {
    if (gameData) {
      await deleteGame(gameData.id);
      await deleteUser(gameData.userId);
    }
    window.location.href = '/';
  };

  return (
    <div className="App">
      <GeoVentureNavBar gameData={gameData} />
      {usernameInputVisible && <UsernameInput onGameAvailable={handleGameAvailable} />}
      {gameData && !showResultPage && (
        <GuessLocationPage gameData={gameData}  onUpdateGameData={handleUpdateGameData}/>
      )}
      {showResultPage && (
        <ResultPage
          correctGuesses={correctGuesses}
          onPlayAgain={handlePlayAgain}
          onExit={handleExit}
        />
      )}

    </div>
    
  );
};

export default App


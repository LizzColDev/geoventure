import React from 'react';
import {Navbar, Container} from 'react-bootstrap';
import icon from '../../../assets/icon.png'
import logo from '../../../assets/logo.png'
import { GameData } from '../../../types/types';
import { deleteGame } from '../../../services/gameService';
import { deleteUser } from '../../../services/userService';
import './GeoVentureNavBar.css';

interface GeoVentureNavBarprops {
  gameData: GameData | null;
}

const GeoVentureNavBar: React.FC<GeoVentureNavBarprops> = ({ gameData }) => {
  
  const redirectToHomePage = async () => {
    if (gameData) {
      await deleteGame(gameData.id);
      await deleteUser(gameData.userId);
    }
    window.location.href = '/';
  };

  return (
    <>
      <Navbar className="nav-icon bg-body-tertiary">
        <Container>
          <Navbar.Brand
            style={{ cursor: 'pointer' }}
            onClick={redirectToHomePage}>
            <img
              alt=""
              src={icon}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />{' '}
            <img
              alt=""
              src={logo}
              width="160"
              height="60"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default GeoVentureNavBar;

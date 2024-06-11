import { Button, Container, Navbar } from 'react-bootstrap';
import './index.css'

interface NavProps {
  handleGuess: () => void;
}

const GuessFooter: React.FC<NavProps> = ({ handleGuess }) => {
  return (
    <Navbar className="nav-footer bg-body-tertiary">
      <Container className="d-flex justify-content-center h-100 align-items-center">
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <Button className="guess-button" onClick={handleGuess}>
            Guess
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GuessFooter;

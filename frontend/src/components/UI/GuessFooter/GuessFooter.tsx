import { Container, Navbar } from 'react-bootstrap';
import './GuessFooter.css'
import CustomButton from '../../common/CustomButton/CustomButton';

interface NavProps {
  handleGuess: () => void;
}

const GuessFooter: React.FC<NavProps> = ({ handleGuess }) => {
  return (
    <Navbar className="nav-footer bg-body-tertiary">
      <Container className="d-flex justify-content-center h-100 align-items-center">
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <CustomButton variant="primary" onClick={handleGuess}>
              Guess
          </CustomButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GuessFooter;

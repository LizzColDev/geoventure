import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import icon from '../../../assets/icon.png'
import logo from '../../../assets/logo.png'
import './GeoVentureNavBar.css'

function GeoVentureNavBar() {
  return (
    <>
      <Navbar className="nav-icon bg-body-tertiary">
        <Container>
          <Navbar.Brand>
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

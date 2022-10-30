import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function ({token, setToken}) {
    return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Solar Monitoring</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Dashboard</Nav.Link>
            <Nav.Link href="#user">Użytkonik</Nav.Link>
            <Nav.Link href="#counter">Licznik</Nav.Link>
            <Nav.Link href="#inverters">Falowniki</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => {setToken("")}}>Wyloguj</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
    )}

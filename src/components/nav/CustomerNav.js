import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { logout } from "../helpers/logout"
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { BsHouseDoorFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
export const CustomerNav = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    logout.logout(navigate);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky='top'>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/" className='text=white'><BsHouseDoorFill /></Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link href="/random">Random Album</Nav.Link>
          </Nav>
        </Container>
        <Button className="glow-on-hover logutOutBtn" variant="dark" onClick={onLogout}>Logout</Button>
      </Navbar>
    </>
  );
}

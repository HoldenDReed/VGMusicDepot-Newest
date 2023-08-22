import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { logout } from "../helpers/logout"
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { BsHouseDoorFill } from 'react-icons/bs';
export const EmployeeNav = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    logout.logout(navigate);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky='top'>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/"><BsHouseDoorFill /></Nav.Link>
            <Nav.Link href="/albums/create">Create Album</Nav.Link>
            <Nav.Link href="/random">Random Album</Nav.Link>
          </Nav>
        </Container>
        <Button className="glow-on-hover logutOutBtn" variant="dark" onClick={onLogout}>Logout</Button>
      </Navbar>
    </>
  );
}

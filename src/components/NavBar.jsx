import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const NavBar = ({ user, setUser }) => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Messaging App</Navbar.Brand>
        {user && (
          <Navbar.Collapse className="justify-content-end">
            <Nav.Item>
              Signed in as: <strong>{user}</strong>
            </Nav.Item>
            <Button
              variant={'outline-dark'}
              className="ms-3"
              onClick={() => setUser('')}
            >
              Log Out
            </Button>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;

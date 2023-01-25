import React from 'react';
import { useState } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';

const Auth = ({ setUser }) => {
  const [recipient, setRecipient] = useState('');

  const handleClick = async () => {
    if (!recipient) {
      alert('Provide a name');
      return;
    }
    setUser(recipient);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 100 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h3 className="m-auto">Please enter your name</h3>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-5"
            placeholder="Name..."
            onChange={(e) => setRecipient(e.target.value)}
          />
          <Button
            variant="success"
            className="mt-3 ms-auto"
            style={{ width: '20%' }}
            onClick={() => handleClick()}
          >
            Start
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;

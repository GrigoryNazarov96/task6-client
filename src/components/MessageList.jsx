import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import MyModal from './MyModal';
import { deleteMessage, fetchMessages } from '../http/requests';
import { DateTime } from 'luxon';
import { io } from 'socket.io-client';
import { useCallback } from 'react';

const socket = io(`${process.env.REACT_APP_SERVER_URL}`);

const MessageList = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const [messages, setMessages] = useState([]);

  const handleSocketEvent = useCallback(
    (message) => {
      setMessages([message, ...messages]);
      console.log(message);
    },
    [messages]
  );

  const handleRemove = async (id) => {
    await deleteMessage(id);
    setMessages(messages.filter((m) => m._id !== id));
  };

  useEffect(() => {
    fetchMessages(user).then((data) => setMessages(data));
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on(`messageTo${user}`, handleSocketEvent);
    return () => socket.off(`messageTo${user}`);
  }, [messages]);

  return (
    <>
      <MyModal
        messages={messages}
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
      />
      <Container>
        <div className="mt-5 mb-3 d-flex justify-content-between align-items-center">
          <h2>Incoming</h2>
          <Button variant="primary" onClick={() => handleShow()}>
            Send Message
          </Button>
        </div>
        {messages.length > 0 ? (
          messages.map((m) => (
            <Card className="mb-2" key={m._id}>
              <Card.Header>
                {DateTime.fromISO(m.sentDate)
                  .setLocale('uk')
                  .toLocaleString(DateTime.DATETIME_SHORT)}{' '}
                from {m.sender}
              </Card.Header>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div style={{ width: '100%' }}>
                  <Card.Title>{m.messageTitle}</Card.Title>
                  <Card.Text>{m.messageBody}</Card.Text>
                </div>
                <div>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemove(m._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: 300 }}
          >
            <h4>Your messages will be displayed here</h4>
          </div>
        )}
      </Container>
    </>
  );
};

export default MessageList;

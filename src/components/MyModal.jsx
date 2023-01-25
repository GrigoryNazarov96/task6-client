import React, { useState } from 'react';
import { Modal, Form, Button, ListGroup } from 'react-bootstrap';
// import { Typeahead } from 'react-bootstrap-typeahead';
import { sendMessage } from '../http/requests';

const MyModal = ({ user, showModal, setShowModal, messages }) => {
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleClose = () => setShowModal(false);

  const options = Array.from(new Set(messages.map((m) => m.sender))).filter(
    (m) =>
      m.toLowerCase().startsWith(recipient.toLowerCase()) &&
      m !== recipient &&
      recipient
  );

  const handleNewMessage = async () => {
    await sendMessage(recipient, user, title, body);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {/* <Typeahead
              id="recipientSelection"
              allowNew
              labelKey="name"
              onInputChange={(_, e) => setRecipient(e.target.value)}
              onChange={setSelected}
              options={options}
              placeholder="Choose a recipient..."
              newSelectionPrefix="Add a new recipient: "
              selected={selected}
            /> */}
            <Form.Control
              type="recipient"
              placeholder="Recipient..."
              className="mt-2"
              onChange={(e) => setRecipient(e.target.value)}
              value={recipient}
            />
            <ListGroup>
              {options.map((option) => (
                <ListGroup.Item
                  onClick={() => setRecipient(option)}
                  key={option}
                  action
                >
                  {option}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Control
              type="title"
              placeholder="Title..."
              className="mt-2"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleNewMessage()}>
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;

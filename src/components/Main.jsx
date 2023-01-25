import React, { useState } from 'react';
import NavBar from './NavBar';
import MessageList from './MessageList';
import Auth from './Auth';

const Main = () => {
  const [user, setUser] = useState('');

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      {user ? <MessageList user={user} /> : <Auth setUser={setUser} />}
    </>
  );
};

export default Main;

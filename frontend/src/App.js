import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Importiere die Router-Komponenten
import './style.css';
import { Helmet } from 'react-helmet';
import HomePage from './Home'; // Deine erste Seite
import RoomPage from './Room'; // Deine zweite Seite
import AdminPage from './Admin'; // Deine zweite Seite
import AdminRoomPage from './AdminRoom'; // Deine zweite Seite

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<><Helmet><title>Start | Quizzle</title></Helmet><HomePage /></>} />
        <Route path="/room/:roomCode" element={<><Helmet><title>Spielen | Quizzle</title></Helmet><RoomPage /></>} />
        <Route path="/admin" element={<><Helmet><title>Admin | Quizzle</title></Helmet><AdminPage /></>} />
        <Route path="/admin/room/:roomCode" element={<><Helmet><title>Besichtigen | Quizzle</title></Helmet><AdminRoomPage /></>} />
      </Routes>
    </div>
  );
};

export default App;
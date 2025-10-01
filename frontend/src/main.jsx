import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="register/:eventId" element={<Register />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

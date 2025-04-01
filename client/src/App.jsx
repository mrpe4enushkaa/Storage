import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Indentification from './pages/Identification/Identification';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';
import './App.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Indentification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
import React from 'react';
import { Routes, Route } from "react-router";
import Indentification from './pages/Indentification/Indentification';
import './App.scss';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Indentification />} />
      <Route path='*' element={<span style={{ color: '#fff' }}>Error: 404</span>} />
    </Routes>
  );
}
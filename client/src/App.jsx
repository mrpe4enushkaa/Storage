import React from 'react';
import { Routes, Route } from "react-router";
import Identification from './pages/Indentification/Indentification';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Identification />} />
      <Route path='*' element={<span style={{ color: '#fff' }}>Error: 404</span>} />
    </Routes>
  );
}
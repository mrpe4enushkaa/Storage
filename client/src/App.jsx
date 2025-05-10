import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Indentification from './pages/Identification/Identification';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';
import "react-toastify/dist/ReactToastify.css";
import './App.scss';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Indentification showToast={showToast} />} />
          <Route path="/profile" element={<Profile showToast={showToast} />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

const showToast = (type, text) => {
  switch (type) {
    case "success":
      toast.success(text);
      break;
    case "warning":
      toast.warn(text);
      break;
    case "error":
      toast.error(text);
      break;
    default:
      break;
  }
};
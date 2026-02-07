import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainContent } from './components/MainContent';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VendorAdPage from './pages/VendorAdPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/add-ad" element={<VendorAdPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainContent } from './components/MainContent';
import CustomerLoginPage from './pages/CustomerLoginPage';
import CustomerSignupPage from './pages/CustomerSignupPage';
import VendorLoginPage from './pages/VendorLoginPage';
import VendorSignupPage from './pages/VendorSignupPage';
import VendorAdPage from './pages/VendorAdPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/signup" element={<CustomerSignupPage />} />
        <Route path="/vendor/login" element={<VendorLoginPage />} />
        <Route path="/vendor/signup" element={<VendorSignupPage />} />
        <Route path="/add-ad" element={<VendorAdPage />} />
      </Routes>
    </Router>
  );
}

export default App;

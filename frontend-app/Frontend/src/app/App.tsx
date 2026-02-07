import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { VendorListings } from './components/VendorListings';
import { VendorDetails } from './components/VendorDetails';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { UserDashboard } from './components/UserDashboard';
import { VendorDashboard } from './components/VendorDashboard';

export type Category = 'dress' | 'venue' | 'saloon' | 'photographer';

export interface Vendor {
  id: number;
  name: string;
  category: Category;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  priceRange: string;
  featured?: boolean;
}

export interface Review {
  id: number;
  vendorId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vendors" element={<VendorListings />} />
        <Route path="/vendors/:id" element={<VendorDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/vendor" element={<VendorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

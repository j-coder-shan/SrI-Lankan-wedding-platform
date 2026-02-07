import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { VendorListings } from './components/VendorListings';
import { VendorDetails } from './components/VendorDetails';

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
  const [currentView, setCurrentView] = useState<'home' | 'listings' | 'details'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('listings');
  };

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setCurrentView('details');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSelectedVendor(null);
  };

  const handleBackToListings = () => {
    setCurrentView('listings');
    setSelectedVendor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' && (
        <HomePage onCategorySelect={handleCategorySelect} />
      )}
      {currentView === 'listings' && selectedCategory && (
        <VendorListings
          category={selectedCategory}
          onVendorSelect={handleVendorSelect}
          onBackToHome={handleBackToHome}
        />
      )}
      {currentView === 'details' && selectedVendor && (
        <VendorDetails
          vendor={selectedVendor}
          onBack={handleBackToListings}
        />
      )}
    </div>
  );
}

export default App;

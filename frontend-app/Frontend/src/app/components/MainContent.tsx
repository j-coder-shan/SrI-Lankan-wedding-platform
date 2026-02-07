import React, { useState } from 'react';
import { HomePage } from './HomePage';
import { VendorListings } from './VendorListings';
import { VendorDetails } from './VendorDetails';
import { Category, Vendor } from '../types';

export function MainContent() {
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

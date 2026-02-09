import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { VendorDashboard } from './components/dashboard/VendorDashboard';
import { CoupleDashboard } from './components/dashboard/CoupleDashboard';
import { DashboardRedirect } from './components/dashboard/DashboardRedirect';
import { VendorListings } from './components/VendorListings';
import { VendorDetails } from './components/VendorDetails';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { HelpCenterPage } from './components/HelpCenterPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';

export type Category = 'dress' | 'venue' | 'salon' | 'photographer';

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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/vendors" element={<VendorListings />} />
          <Route path="/vendors/:id" element={<VendorDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard/vendor/*"
            element={
              <ProtectedRoute allowedRoles={['ROLE_VENDOR']}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/couple/*"
            element={
              <ProtectedRoute allowedRoles={['ROLE_COUPLE']}>
                <CoupleDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default Dashboard Redirection handled by ProtectedRoute logic or component */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />

          {/* Vendor Dashboard Alias for Footer Link */}
          <Route
            path="/vendor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['ROLE_VENDOR']}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

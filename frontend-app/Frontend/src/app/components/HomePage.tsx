import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CategoryCard } from './CategoryCard';
import { FeaturedVendors } from './FeaturedVendors';
import { Category } from '../types';

interface HomePageProps {
  onCategorySelect: (category: Category) => void;
}

export function HomePage({ onCategorySelect }: HomePageProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              <span className="text-2xl font-semibold text-gray-900">WeddingHub</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">
                Vendors
              </a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors">
                Contact
              </a>
              <Button
                variant="outline"
                className="border-rose-500 text-rose-500 hover:bg-rose-50"
                onClick={() => navigate('/vendor/login')}
              >
                Vendor Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Dream Wedding
              <span className="text-rose-500"> Starts Here</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the perfect vendors for your special day. From stunning venues to exquisite dresses, we've got everything you need.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-full shadow-lg p-2 flex gap-2">
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  placeholder="Search for vendors, venues, or services..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button className="rounded-full bg-rose-500 hover:bg-rose-600 px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect vendors for every aspect of your wedding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Wedding Dress"
              description="Find your perfect dress for the big day"
              category="dress"
              image="https://images.unsplash.com/photo-1637829855946-0795557bfb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBicmlkZXxlbnwxfHx8fDE3NjYzMjY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onSelect={onCategorySelect}
            />
            <CategoryCard
              title="Venues"
              description="Discover stunning wedding venues"
              category="venue"
              image="https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBlbGVnYW50fGVufDF8fHx8MTc2NjQwNzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onSelect={onCategorySelect}
            />
            <CategoryCard
              title="Salons"
              description="Professional beauty services"
              category="saloon"
              image="https://images.unsplash.com/photo-1713548902214-bd930728bd89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBicmlkYWx8ZW58MXx8fHwxNzY2NDMxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onSelect={onCategorySelect}
            />
            <CategoryCard
              title="Photographers"
              description="Capture your precious moments"
              category="photographer"
              image="https://images.unsplash.com/photo-1629120881990-0c5b979884bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY2FtZXJhfGVufDF8fHx8MTc2NjMyNzA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onSelect={onCategorySelect}
            />
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <FeaturedVendors onCategorySelect={onCategorySelect} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <span className="text-xl font-semibold">WeddingHub</span>
              </div>
              <p className="text-gray-400">
                Your one-stop platform for all wedding needs
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Wedding Dresses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Venues</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Salons</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Photographers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); navigate('/vendor/signup'); }}>Become a Vendor</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 WeddingHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

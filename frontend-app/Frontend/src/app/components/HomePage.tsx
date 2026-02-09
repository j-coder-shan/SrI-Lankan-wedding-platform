import React from 'react';

import { CategoryCard } from './CategoryCard';
import { FeaturedVendors } from './FeaturedVendors';
import { Category } from '../App';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  const handleCategorySelect = (category: Category) => {
    navigate(`/vendors?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 py-24">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Your Dream Wedding
              <span className="text-rose-600"> Starts Here</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Discover the perfect vendors for your special day. From stunning venues to exquisite dresses, we've got everything you need.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We connect you with the finest wedding professionals in Sri Lanka, ensuring your celebration is nothing short of magical. Whether you're planning an intimate gathering or a grand royal wedding, our platform simplifies the planning process.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Browse through verified reviews, view portfolios, and connect directly with vendors who match your style and budget. Let us help you turn your vision into reality, stress-free.
            </p>


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
              onSelect={handleCategorySelect}
            />
            <CategoryCard
              title="Venues"
              description="Discover stunning wedding venues"
              category="venue"
              image="https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBlbGVnYW50fGVufDF8fHx8MTc2NjQwNzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onSelect={handleCategorySelect}
            />
            <CategoryCard
              title="Salons"
              description="Professional beauty services"
              category="salon"
              image="https://images.unsplash.com/photo-1713548902214-bd930728bd89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBicmlkYWx8ZW58MXx8fHwxNzY2NDMxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onSelect={handleCategorySelect}
            />
            <CategoryCard
              title="Photographers"
              description="Capture your precious moments"
              category="photographer"
              image="https://images.unsplash.com/photo-1629120881990-0c5b979884bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY2FtZXJhfGVufDF8fHx8MTc2NjMyNzA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              onSelect={handleCategorySelect}
            />
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <FeaturedVendors onCategorySelect={handleCategorySelect} />

      {/* Footer */}
      <Footer />
    </div>
  );
}


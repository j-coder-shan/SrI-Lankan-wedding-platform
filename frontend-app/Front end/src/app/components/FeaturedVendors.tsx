import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Category } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedVendorsProps {
  onCategorySelect: (category: Category) => void;
}

const featuredVendors = [
  {
    id: 1,
    name: 'Elegant Moments Venue',
    category: 'venue' as Category,
    image: 'https://images.unsplash.com/photo-1764380754282-194c847f6d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc2NjM0MzcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviewCount: 127,
    location: 'Beverly Hills, CA',
    priceRange: '$$$'
  },
  {
    id: 2,
    name: 'Bella Bridal Boutique',
    category: 'dress' as Category,
    image: 'https://images.unsplash.com/photo-1637829855946-0795557bfb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBicmlkZXxlbnwxfHx8fDE3NjYzMjY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    reviewCount: 89,
    location: 'New York, NY',
    priceRange: '$$'
  },
  {
    id: 3,
    name: 'Luxe Beauty Studio',
    category: 'saloon' as Category,
    image: 'https://images.unsplash.com/photo-1713548902214-bd930728bd89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBicmlkYWx8ZW58MXx8fHwxNzY2NDMxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 156,
    location: 'Los Angeles, CA',
    priceRange: '$$'
  },
  {
    id: 4,
    name: 'Perfect Moments Photography',
    category: 'photographer' as Category,
    image: 'https://images.unsplash.com/photo-1629120881990-0c5b979884bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY2FtZXJhfGVufDF8fHx8MTc2NjMyNzA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviewCount: 203,
    location: 'Miami, FL',
    priceRange: '$$$'
  }
];

export function FeaturedVendors({ onCategorySelect }: FeaturedVendorsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">Featured</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Rated Vendors
          </h2>
          <p className="text-xl text-gray-600">
            Hand-picked vendors loved by couples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVendors.map((vendor) => (
            <Card 
              key={vendor.id}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => onCategorySelect(vendor.category)}
            >
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{vendor.name}</h3>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {vendor.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{vendor.location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{vendor.rating}</span>
                    <span className="text-sm text-gray-500">({vendor.reviewCount})</span>
                  </div>
                  <span className="text-sm text-gray-600">{vendor.priceRange}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

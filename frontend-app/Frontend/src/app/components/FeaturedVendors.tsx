import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Vendor, Category } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { vendorService } from '../services/vendorService';
import { useNavigate } from 'react-router-dom';

interface FeaturedVendorsProps {
  onCategorySelect: (category: Category) => void;
}

export function FeaturedVendors({ onCategorySelect }: FeaturedVendorsProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Fetch all vendors (or specific featured endpoint if available)
        // For now, we take the top 4 rated vendors
        const allVendors = await vendorService.getAllVendors();
        const topRated = allVendors
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
        setVendors(topRated);
      } catch (error) {
        console.error("Failed to load featured vendors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 text-center">
        <p>Loading featured vendors...</p>
      </section>
    );
  }

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
          {vendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => navigate(`/vendors/${vendor.id}`)}
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
                    <span className="font-semibold text-sm">{vendor.rating || 'New'}</span>
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

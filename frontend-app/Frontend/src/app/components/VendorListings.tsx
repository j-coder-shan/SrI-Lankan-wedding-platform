import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Vendor, Category } from '../App';
import { vendorService } from '../services/vendorService';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Star } from 'lucide-react';

export function VendorListings() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = (searchParams.get('category') as Category) || 'dress'; // Default or handle all

  const categoryTitles: Record<Category, string> = {
    dress: 'Wedding Dresses & Attire',
    venue: 'Wedding Venues',
    salon: 'Beauty Salons',
    photographer: 'Wedding Photographers'
  };

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const data = await vendorService.getAllVendors(category, priceFilter);
        setVendors(data);
      } catch (error) {
        console.error("Failed to load vendors", error);
        // Optional: Show error toast
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [category, priceFilter]);

  const filteredVendors = vendors
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{categoryTitles[category] || 'All Vendors'}</h1>
              <p className="text-sm text-gray-600">{filteredVendors.length} vendors available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-[146px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="$$">$$ - Moderate</SelectItem>
                <SelectItem value="$$$">$$$ - Upscale</SelectItem>
                <SelectItem value="$$$$">$$$$ - Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
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
                {vendor.featured && (
                  <Badge className="absolute top-3 right-3 bg-rose-500">
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                  {vendor.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
                  {vendor.description}
                </p>

                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.location}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span className="text-sm text-gray-500">({vendor.reviewCount} reviews)</span>
                  </div>
                  <span className="font-medium text-gray-900">{vendor.priceRange}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No vendors found matching your criteria.</p>
            <Button
              onClick={() => setPriceFilter('all')}
              className="mt-4 bg-rose-500 hover:bg-rose-600"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

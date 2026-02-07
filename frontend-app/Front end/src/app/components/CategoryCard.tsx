import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Category } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryCardProps {
  title: string;
  description: string;
  category: Category;
  image: string;
  onSelect: (category: Category) => void;
}

export function CategoryCard({ title, description, category, image, onSelect }: CategoryCardProps) {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => onSelect(category)}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-rose-500 group-hover:text-rose-600">
          <span className="mr-2">Explore</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}

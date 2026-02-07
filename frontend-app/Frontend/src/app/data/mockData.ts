import { Vendor, Review } from '../App';

export const vendors: Vendor[] = [
  // Dress Vendors
  {
    id: 1,
    name: 'Bella Bridal Boutique',
    category: 'dress',
    description: 'Premier bridal boutique featuring exclusive designer wedding dresses and gowns. Our expert stylists help you find the perfect dress for your special day.',
    image: 'https://images.unsplash.com/photo-1637829855946-0795557bfb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBicmlkZXxlbnwxfHx8fDE3NjYzMjY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    reviewCount: 89,
    location: 'New York, NY',
    priceRange: '$$',
    featured: true
  },
  {
    id: 2,
    name: 'Enchanted Elegance',
    category: 'dress',
    description: 'Luxury bridal wear with custom alterations and fittings. We specialize in couture wedding gowns and bridesmaid dresses.',
    image: 'https://images.unsplash.com/photo-1637829855946-0795557bfb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBicmlkZXxlbnwxfHx8fDE3NjYzMjY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 67,
    location: 'Los Angeles, CA',
    priceRange: '$$$'
  },
  {
    id: 3,
    name: 'The Groom\'s Gallery',
    category: 'dress',
    description: 'Premium suits and tuxedos for grooms and groomsmen. Custom tailoring and rental options available.',
    image: 'https://images.unsplash.com/photo-1766104804438-28f42f89604f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9vbSUyMHN1aXQlMjBmb3JtYWx8ZW58MXx8fHwxNzY2NDMxNDM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviewCount: 54,
    location: 'Chicago, IL',
    priceRange: '$$'
  },
  {
    id: 4,
    name: 'Divine Bridal Collection',
    category: 'dress',
    description: 'Boutique featuring vintage and modern wedding dresses. Personalized styling sessions available.',
    image: 'https://images.unsplash.com/photo-1637829855946-0795557bfb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBicmlkZXxlbnwxfHx8fDE3NjYzMjY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviewCount: 112,
    location: 'Miami, FL',
    priceRange: '$$'
  },

  // Venue Vendors
  {
    id: 5,
    name: 'Elegant Moments Venue',
    category: 'venue',
    description: 'Stunning outdoor and indoor wedding venue with breathtaking gardens and elegant ballrooms. Accommodates up to 300 guests.',
    image: 'https://images.unsplash.com/photo-1764380754282-194c847f6d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc2NjM0MzcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviewCount: 127,
    location: 'Beverly Hills, CA',
    priceRange: '$$$',
    featured: true
  },
  {
    id: 6,
    name: 'Grand Plaza Hotel',
    category: 'venue',
    description: 'Luxury hotel with multiple wedding packages. Premium catering and accommodation for guests included.',
    image: 'https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBlbGVnYW50fGVufDF8fHx8MTc2NjQwNzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviewCount: 98,
    location: 'San Francisco, CA',
    priceRange: '$$$$'
  },
  {
    id: 7,
    name: 'Seaside Ceremony Hall',
    category: 'venue',
    description: 'Romantic beachfront venue with panoramic ocean views. Perfect for intimate and large celebrations.',
    image: 'https://images.unsplash.com/photo-1764380754282-194c847f6d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc2NjM0MzcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 84,
    location: 'Malibu, CA',
    priceRange: '$$$'
  },
  {
    id: 8,
    name: 'The Heritage Estate',
    category: 'venue',
    description: 'Historic mansion with beautiful architecture and manicured gardens. Exclusive use for your wedding day.',
    image: 'https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBlbGVnYW50fGVufDF8fHx8MTc2NjQwNzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviewCount: 73,
    location: 'Boston, MA',
    priceRange: '$$$$'
  },

  // Saloon Vendors
  {
    id: 9,
    name: 'Luxe Beauty Studio',
    category: 'saloon',
    description: 'Professional bridal hair and makeup services. Trial sessions and on-location services available.',
    image: 'https://images.unsplash.com/photo-1713548902214-bd930728bd89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBicmlkYWx8ZW58MXx8fHwxNzY2NDMxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 156,
    location: 'Los Angeles, CA',
    priceRange: '$$',
    featured: true
  },
  {
    id: 10,
    name: 'Radiance Bridal Salon',
    category: 'saloon',
    description: 'Full-service beauty salon specializing in bridal packages. Hair, makeup, nails, and spa treatments.',
    image: 'https://images.unsplash.com/photo-1713548902214-bd930728bd89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBicmlkYWx8ZW58MXx8fHwxNzY2NDMxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviewCount: 143,
    location: 'New York, NY',
    priceRange: '$$$'
  },
  {
    id: 11,
    name: 'Glam Squad Beauty Bar',
    category: 'saloon',
    description: 'Modern beauty bar with expert stylists. Bridal party packages available.',
    image: 'https://images.unsplash.com/photo-1713548902214-bd930728bd89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBicmlkYWx8ZW58MXx8fHwxNzY2NDMxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviewCount: 92,
    location: 'Miami, FL',
    priceRange: '$$'
  },
  {
    id: 12,
    name: 'Elegant Touch Salon',
    category: 'saloon',
    description: 'Award-winning hair and makeup artists. Customized bridal looks for your special day.',
    image: 'https://images.unsplash.com/photo-1713548902214-bd930728bd89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBicmlkYWx8ZW58MXx8fHwxNzY2NDMxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    reviewCount: 78,
    location: 'Seattle, WA',
    priceRange: '$$$'
  },

  // Photographer Vendors
  {
    id: 13,
    name: 'Perfect Moments Photography',
    category: 'photographer',
    description: 'Award-winning wedding photographers capturing authentic moments. Packages include engagement and wedding day coverage.',
    image: 'https://images.unsplash.com/photo-1629120881990-0c5b979884bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY2FtZXJhfGVufDF8fHx8MTc2NjMyNzA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviewCount: 203,
    location: 'Miami, FL',
    priceRange: '$$$',
    featured: true
  },
  {
    id: 14,
    name: 'Timeless Captures Studio',
    category: 'photographer',
    description: 'Professional wedding photography and videography. Cinematic style with modern editing.',
    image: 'https://images.unsplash.com/photo-1629120881990-0c5b979884bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY2FtZXJhfGVufDF8fHx8MTc2NjMyNzA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 167,
    location: 'Austin, TX',
    priceRange: '$$'
  },
  {
    id: 15,
    name: 'Love Story Films',
    category: 'photographer',
    description: 'Specializing in candid wedding photography and videography. Drone footage available.',
    image: 'https://images.unsplash.com/photo-1629120881990-0c5b979884bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY2FtZXJhfGVufDF8fHx8MTc2NjMyNzA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    reviewCount: 134,
    location: 'Portland, OR',
    priceRange: '$$$'
  },
  {
    id: 16,
    name: 'Artistic Vision Photography',
    category: 'photographer',
    description: 'Creative and artistic wedding photography. Fine art prints and custom albums included.',
    image: 'https://images.unsplash.com/photo-1629120881990-0c5b979884bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaGVyJTIwY2FtZXJhfGVufDF8fHx8MTc2NjMyNzA5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviewCount: 98,
    location: 'Denver, CO',
    priceRange: '$$'
  }
];

export const reviews: Review[] = [
  // Bella Bridal Boutique (ID: 1)
  {
    id: 1,
    vendorId: 1,
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely loved my experience here! The staff was incredibly helpful and patient. I found my dream dress on my first visit. Highly recommend!',
    date: '2024-11-15'
  },
  {
    id: 2,
    vendorId: 1,
    userName: 'Emily Chen',
    rating: 5,
    comment: 'The selection is amazing and the stylists really know their stuff. They helped me find a dress that fit my budget and style perfectly.',
    date: '2024-10-28'
  },
  {
    id: 3,
    vendorId: 1,
    userName: 'Jessica Martinez',
    rating: 5,
    comment: 'Best bridal boutique in NYC! The alterations were perfect and done on time. Could not be happier!',
    date: '2024-10-12'
  },

  // Elegant Moments Venue (ID: 5)
  {
    id: 4,
    vendorId: 5,
    userName: 'Michael & Amanda',
    rating: 5,
    comment: 'Our wedding was absolutely perfect! The venue is stunning and the staff made everything so easy. All our guests were blown away by the beautiful gardens.',
    date: '2024-11-20'
  },
  {
    id: 5,
    vendorId: 5,
    userName: 'David Thompson',
    rating: 5,
    comment: 'Worth every penny! The venue coordinator was amazing and helped us through every detail. The indoor ballroom is gorgeous too!',
    date: '2024-11-05'
  },
  {
    id: 6,
    vendorId: 5,
    userName: 'Rachel Green',
    rating: 4,
    comment: 'Beautiful venue with excellent service. Only minor issue was parking, but they provided shuttle service which was great.',
    date: '2024-10-18'
  },

  // Luxe Beauty Studio (ID: 9)
  {
    id: 7,
    vendorId: 9,
    userName: 'Lisa Anderson',
    rating: 5,
    comment: 'My hair and makeup looked flawless all day and night! The trial session was so helpful. They really listened to what I wanted.',
    date: '2024-11-22'
  },
  {
    id: 8,
    vendorId: 9,
    userName: 'Michelle Park',
    rating: 5,
    comment: 'Professional, talented, and so sweet! They made me feel like a princess. My bridesmaids looked amazing too!',
    date: '2024-11-10'
  },
  {
    id: 9,
    vendorId: 9,
    userName: 'Jennifer Lee',
    rating: 4,
    comment: 'Great service and beautiful results. Slightly pricey but definitely worth it for your wedding day!',
    date: '2024-10-25'
  },

  // Perfect Moments Photography (ID: 13)
  {
    id: 10,
    vendorId: 13,
    userName: 'Chris & Emma',
    rating: 5,
    comment: 'Our photos are absolutely breathtaking! They captured every special moment perfectly. We cry happy tears every time we look at them.',
    date: '2024-11-18'
  },
  {
    id: 11,
    vendorId: 13,
    userName: 'Robert Wilson',
    rating: 5,
    comment: 'So glad we chose Perfect Moments! They were professional, creative, and made us feel so comfortable. The photos are magazine-quality!',
    date: '2024-11-02'
  },
  {
    id: 12,
    vendorId: 13,
    userName: 'Sophia Rodriguez',
    rating: 5,
    comment: 'Best decision we made for our wedding! The engagement session was fun and the wedding day coverage was incredible. Cannot recommend enough!',
    date: '2024-10-20'
  }
];

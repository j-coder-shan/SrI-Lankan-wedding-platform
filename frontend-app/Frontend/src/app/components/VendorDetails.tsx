import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, DollarSign, Calendar, Phone, Mail, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { reviews, vendors } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './Navbar';

export function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = vendors.find(v => v.id === Number(id));

  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewComment, setReviewComment] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  const vendorReviews = reviews.filter(r => r.vendorId === vendor.id);

  const handleBooking = () => {
    if (!bookingDate || !bookingName || !bookingEmail || !bookingPhone) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Booking request submitted! The vendor will contact you soon.');
    setIsBookingOpen(false);
    // Reset form
    setBookingDate('');
    setBookingName('');
    setBookingEmail('');
    setBookingPhone('');
    setBookingMessage('');
  };

  const handleReviewSubmit = () => {
    if (!reviewComment.trim()) {
      toast.error('Please write a review comment');
      return;
    }
    toast.success('Thank you for your review!');
    setIsReviewOpen(false);
    setReviewComment('');
    setReviewRating('5');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {vendor.featured && (
          <Badge className="absolute top-6 right-6 bg-rose-500 text-white">
            Featured Vendor
          </Badge>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vendor Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-3xl">{vendor.name}</CardTitle>
                      <Badge variant="secondary" className="capitalize">
                        {vendor.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-sm">({vendor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{vendor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{vendor.priceRange}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="shrink-0"
                  >
                    <Heart
                      className={`w-6 h-6 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reviews">Reviews ({vendorReviews.length})</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Star className="w-4 h-4" />
                        Write a Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="rating">Rating</Label>
                          <Select value={reviewRating} onValueChange={setReviewRating}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 Stars - Excellent</SelectItem>
                              <SelectItem value="4">4 Stars - Very Good</SelectItem>
                              <SelectItem value="3">3 Stars - Good</SelectItem>
                              <SelectItem value="2">2 Stars - Fair</SelectItem>
                              <SelectItem value="1">1 Star - Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="comment">Your Review</Label>
                          <Textarea
                            id="comment"
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Share your experience..."
                            rows={5}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsReviewOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleReviewSubmit} className="bg-rose-500 hover:bg-rose-600">
                          Submit Review
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {vendorReviews.length > 0 ? (
                  <div className="space-y-4">
                    {vendorReviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-semibold text-gray-900">{review.userName}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                      <p className="text-gray-700">{vendor.location}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Price Range</h4>
                      <p className="text-gray-700">{vendor.priceRange}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                      <Badge className="capitalize">{vendor.category}</Badge>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                      <p className="text-gray-700">{vendor.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Vendor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>contact@vendor.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{vendor.location}</span>
                  </div>
                </div>

                <Separator />

                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-rose-500 hover:bg-rose-600 gap-2">
                      <Calendar className="w-4 h-4" />
                      Request Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Request a Booking</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                          id="message"
                          value={bookingMessage}
                          onChange={(e) => setBookingMessage(e.target.value)}
                          placeholder="Tell us about your wedding plans..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleBooking} className="bg-rose-500 hover:bg-rose-600">
                        Submit Request
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  Send Message
                </Button>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 text-center">
                    Response time: Usually within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

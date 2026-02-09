import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { HelpCircle } from 'lucide-react';

export function HelpCenterPage() {
    const faqs = [
        {
            question: "How do I book a vendor?",
            answer: "Browse our vendor listings, select your preferred vendor, and click the 'Book Now' button. Fill in your details and preferred date, and the vendor will respond to your enquiry within 24 hours."
        },
        {
            question: "How do I become a vendor on WeddingHub?",
            answer: "Click on 'Become a Vendor' in the footer or navigation menu. You'll need to create a vendor account and complete your profile with your business details, services, and pricing."
        },
        {
            question: "Can I leave reviews for vendors?",
            answer: "Yes! After your event, you can leave a review and rating for the vendors you worked with. This helps other couples make informed decisions."
        },
        {
            question: "How do I contact a vendor directly?",
            answer: "On each vendor's detail page, you'll find a 'Send Message' button. This allows you to communicate directly with the vendor through our messaging system."
        },
        {
            question: "What payment methods do you accept?",
            answer: "Payment arrangements are made directly between you and the vendor. WeddingHub is a platform to connect couples with vendors - we don't process payments."
        },
        {
            question: "Can I save my favorite vendors?",
            answer: "Yes! Click the heart icon on any vendor listing to add them to your favorites. You can view all your saved vendors in your dashboard."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <HelpCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Help Center
                    </h1>
                    <p className="text-xl text-gray-600">
                        Find answers to frequently asked questions
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Card key={index} className="shadow-lg border-purple-100 hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-900">
                                    {faq.question}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="mt-12 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200 shadow-lg">
                    <CardContent className="pt-6">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
                            Still need help?
                        </h3>
                        <p className="text-gray-700 text-center mb-4">
                            Can't find what you're looking for? Contact our support team.
                        </p>
                        <div className="text-center">
                            <a
                                href="/contact"
                                className="inline-block bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all"
                            >
                                Contact Support
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Footer />
        </div>
    );
}

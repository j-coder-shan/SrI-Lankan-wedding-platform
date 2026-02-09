import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Card, CardContent } from './ui/card';
import { FileText } from 'lucide-react';

export function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <FileText className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-600">
                        Last updated: February 2025
                    </p>
                </div>

                <Card className="shadow-xl border-gray-200">
                    <CardContent className="pt-8 space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                By accessing and using WeddingHub, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                2. Use of Service
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-2">
                                WeddingHub provides a platform to connect couples with wedding service vendors. You agree to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the security of your account</li>
                                <li>Not misuse or abuse the platform</li>
                                <li>Respect other users and vendors</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                3. Vendor Listings
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Vendors are responsible for the accuracy of their listings, pricing, and availability. WeddingHub does not guarantee the quality of services provided by vendors and is not liable for any disputes between couples and vendors.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                4. Payments and Bookings
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                All payment arrangements and contracts are made directly between couples and vendors. WeddingHub is not involved in financial transactions and does not process payments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                5. User Content
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                By posting reviews, messages, or other content on WeddingHub, you grant us a non-exclusive, royalty-free license to use, display, and distribute that content on our platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                6. Limitation of Liability
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                WeddingHub is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform or interactions with vendors.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                7. Changes to Terms
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                8. Contact Us
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                If you have any questions about these Terms of Service, please contact us at{' '}
                                <a href="mailto:prabod.jay02@gmail.com" className="text-rose-600 hover:text-rose-700 font-medium">
                                    prabod.jay02@gmail.com
                                </a>
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>

            <Footer />
        </div>
    );
}

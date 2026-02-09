import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Card, CardContent } from './ui/card';
import { Shield } from 'lucide-react';

export function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <Shield className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-600">
                        Last updated: February 2025
                    </p>
                </div>

                <Card className="shadow-xl border-gray-200">
                    <CardContent className="pt-8 space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                1. Information We Collect
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-2">
                                We collect information that you provide directly to us, including:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                <li>Name, email address, and phone number</li>
                                <li>Wedding date and location preferences</li>
                                <li>Messages and enquiries sent to vendors</li>
                                <li>Reviews and ratings you post</li>
                                <li>Account credentials and profile information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-2">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                <li>Provide and improve our services</li>
                                <li>Connect you with wedding vendors</li>
                                <li>Send you booking confirmations and updates</li>
                                <li>Respond to your enquiries and support requests</li>
                                <li>Send promotional emails (with your consent)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                3. Information Sharing
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We share your information with vendors when you make enquiries or bookings. We do not sell your personal information to third parties. We may share aggregated, non-personally identifiable information for analytics purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                4. Data Security
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                5. Cookies and Tracking
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookies through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                6. Your Rights
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-2">
                                You have the right to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                <li>Access and update your personal information</li>
                                <li>Request deletion of your account and data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Object to certain data processing activities</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                7. Children's Privacy
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                WeddingHub is not intended for users under the age of 18. We do not knowingly collect personal information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                8. Changes to This Policy
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                9. Contact Us
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at{' '}
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

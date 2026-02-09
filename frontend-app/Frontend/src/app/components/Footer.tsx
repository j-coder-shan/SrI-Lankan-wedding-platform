import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                            <span className="text-xl font-semibold">WeddingHub</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your one-stop platform for all wedding needs
                        </p>
                    </div>

                    {/* Categories Section */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Categories</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link
                                    to="/vendors?category=dress"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Wedding Dresses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendors?category=venue"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Venues
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendors?category=salon"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Salons
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendors?category=photographer"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Photographers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/vendor-dashboard"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Become a Vendor
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Support</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link
                                    to="/help"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="hover:text-rose-400 transition-colors duration-200 text-sm"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; 2025 WeddingHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

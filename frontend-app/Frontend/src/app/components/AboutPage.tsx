import React from 'react';
import { Navbar } from './Navbar';

export function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Welcome to WeddingHub, your premier destination for planning the perfect Sri Lankan wedding.
                        We connect couples with the finest vendors in the industry, making your dream wedding a reality.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        From breath-taking venues to talented photographers and exquisite bridal wear, we curate the best
                        services to ensure your special day is nothing short of magical.
                    </p>
                </div>
            </div>
        </div>
    );
}

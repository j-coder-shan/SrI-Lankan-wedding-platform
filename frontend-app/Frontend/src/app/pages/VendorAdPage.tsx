import React from 'react';
import VendorAdForm from '../components/VendorAdForm';

export default function VendorAdPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-fixed">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            <div className="relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl drop-shadow-md">
                        Grow Your Wedding Business
                    </h1>
                    <p className="mt-2 text-lg text-gray-200">
                        Reach thousands of couples planning their dream wedding.
                    </p>
                </div>
                <VendorAdForm />
            </div>
        </div>
    );
}

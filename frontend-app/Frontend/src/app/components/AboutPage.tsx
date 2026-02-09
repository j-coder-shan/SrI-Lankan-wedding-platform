import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
                    About Us 💍
                </h1>

                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-center">
                    Planning your dream wedding, the Sri Lankan way 🇱🇰
                </p>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 space-y-6 border border-rose-100 max-w-4xl mx-auto">

                    <p className="text-lg text-gray-700 leading-relaxed">
                        Welcome to <span className="font-semibold text-rose-600">WeddingHub</span>, a wedding planning
                        platform created especially for Sri Lankan couples. We believe a wedding is more than
                        an event — it is a celebration of love, culture, and family traditions. 🌸
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed">
                        From traditional <span className="font-medium text-amber-700">Poruwa ceremonies</span> and
                        Kandyan bridal wear to elegant hotel weddings and romantic beach celebrations,
                        Sri Lankan weddings are beautifully diverse. WeddingHub brings all these possibilities
                        together in one place. 🪔
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed">
                        We connect couples with trusted local vendors including wedding venues, bridal salons,
                        photographers, and designers — helping you choose services that perfectly match
                        your style, budget, and location. 📸
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed">
                        Whether you are planning a small, intimate ceremony or a grand celebration,
                        WeddingHub is here to support you every step of the way —
                        making your dream Sri Lankan wedding a beautiful reality. ✨
                    </p>

                </div>
            </div>

            <Footer />
        </div>
    );
}

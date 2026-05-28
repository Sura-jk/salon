"use client";

import React from 'react';
import { Scissors, Sparkles, User } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 to-pink-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Look
              <span className="block text-purple-600">At Luxe Salon</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience premium hair and beauty services in a luxurious environment. 
              Our expert stylists are dedicated to making you look and feel amazing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Book Appointment
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Our Services
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Scissors className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Hair Styling</h3>
                  <p className="text-sm text-gray-600">Professional cuts & colors</p>
                </div>
                <div className="text-center">
                  <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Nails</h3>
                  <p className="text-sm text-gray-600">Manicures & pedicures</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Spa</h3>
                  <p className="text-sm text-gray-600">Relaxation & beauty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
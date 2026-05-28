"use client";

import React from 'react';
import { Scissors, Sparkles, User, Heart, Palette, Cut } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'Hair Styling',
    description: 'Professional haircuts, coloring, and styling by our expert stylists',
    price: 'Starting from $45',
  },
  {
    icon: Palette,
    title: 'Hair Coloring',
    description: 'Full color highlights, balayage, and custom color treatments',
    price: 'Starting from $80',
  },
  {
    icon: Cut,
    title: 'Hair Treatments',
    description: 'Deep conditioning, keratin treatments, and hair repair services',
    price: 'Starting from $60',
  },
  {
    icon: Sparkles,
    title: 'Nail Services',
    description: 'Manicures, pedicures, gel nails, and nail art',
    price: 'Starting from $35',
  },
  {
    icon: Heart,
    title: 'Facial Treatments',
    description: 'Custom facials, skin analysis, and rejuvenation treatments',
    price: 'Starting from $75',
  },
  {
    icon: User,
    title: 'Spa Services',
    description: 'Massages, body treatments, and complete relaxation packages',
    price: 'Starting from $90',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of beauty and wellness services to help you look and feel your best
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-semibold">{service.price}</span>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
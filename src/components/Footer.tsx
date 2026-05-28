"use client";

import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Luxe Salon</h3>
            <p className="text-gray-300 mb-4">
              Premium beauty and wellness services in a luxurious environment. 
              Your satisfaction is our priority.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-300 hover:text-purple-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-300 hover:text-purple-400 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-300 hover:text-purple-400 cursor-pointer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-purple-400">Hair Styling</a></li>
              <li><a href="#" className="hover:text-purple-400">Hair Coloring</a></li>
              <li><a href="#" className="hover:text-purple-400">Nail Services</a></li>
              <li><a href="#" className="hover:text-purple-400">Facial Treatments</a></li>
              <li><a href="#" className="hover:text-purple-400">Spa Services</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <span>info@luxesalon.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3" />
                <span>123 Beauty St, City, ST 12345</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-3" />
                <span>Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe for exclusive offers and beauty tips
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-purple-600 px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Luxe Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
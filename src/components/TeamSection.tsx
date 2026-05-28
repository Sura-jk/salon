"use client";

import React from 'react';
import { Star } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Stylist',
    bio: '15 years of experience in advanced coloring techniques',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Nail Technician',
    bio: 'Expert in gel nails and nail art design',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Spa Therapist',
    bio: 'Certified massage therapist and skincare specialist',
    rating: 5,
  },
  {
    name: 'Emma Wilson',
    role: 'Hair Colorist',
    bio: 'Specializes in balayage and color correction',
    rating: 5,
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our talented professionals are dedicated to providing you with exceptional service
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="text-2xl font-bold text-purple-600">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-purple-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
              <div className="flex justify-center items-center">
                {[...Array(member.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
"use client";

import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import { MadeWithDyad } from '@/components/made-with-dyad';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TeamSection />
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default Index;

import React from 'react';
import Header from '../components/layout/Header';
import HeroCarousel from '../components/home/HeroCarousel';
import EventsSection from '../components/home/EventsSection';
import Footer from '../components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroCarousel />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Index;

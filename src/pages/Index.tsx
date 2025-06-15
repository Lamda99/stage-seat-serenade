
import React from 'react';
import Header from '../components/layout/Header';
import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedEventsCarousel from '../components/home/FeaturedEventsCarousel';
import EventsSection from '../components/home/EventsSection';
import Footer from '../components/layout/Footer';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';

const Index = () => {
  const { isCorporate } = useCorporateTheme();

  return (
    <div className={`min-h-screen ${
      isCorporate ? 'bg-gradient-to-br from-slate-50 to-blue-50' : 'bg-gradient-to-br from-gray-50 to-orange-50'
    }`}>
      <Header />
      <HeroCarousel />
      <FeaturedEventsCarousel />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Index;

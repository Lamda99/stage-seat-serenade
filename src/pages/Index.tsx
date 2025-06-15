
import React from 'react';
import Header from '../components/layout/Header';
import CenterFocusedCarousel from '../components/home/CenterFocusedCarousel';
import FeaturedEventsCarousel from '../components/home/FeaturedEventsCarousel';
import EventsSection from '../components/home/EventsSection';
import Footer from '../components/layout/Footer';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';

const Index = () => {
  const { isCorporate } = useCorporateTheme();

  return (
    <div className={`min-h-screen w-full ${
      isCorporate ? 'bg-gradient-to-br from-slate-50 to-blue-50' : 'bg-gradient-to-br from-gray-50 to-orange-50'
    }`}>
      <Header />
      <main className="w-full">
        <CenterFocusedCarousel />
        <div className="px-4 sm:px-6 lg:px-8">
          <FeaturedEventsCarousel />
          <EventsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

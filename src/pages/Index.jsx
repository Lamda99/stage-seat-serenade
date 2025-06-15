
import React from 'react';
import EnhancedHeader from '../components/layout/EnhancedHeader';
import CenterFocusedCarousel from '../components/home/CenterFocusedCarousel';
import FeaturedEventsCarousel from '../components/home/FeaturedEventsCarousel';
import CategoryGrid from '../components/categories/CategoryGrid';
import EventsSection from '../components/home/EventsSection';
import Footer from '../components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      <CenterFocusedCarousel />
      <FeaturedEventsCarousel />
      <CategoryGrid />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Index;

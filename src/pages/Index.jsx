
import React from 'react';
import Header from '../components/layout/Header';
import CenterFocusedCarousel from '../components/home/CenterFocusedCarousel';
import FeaturedEventsCarousel from '../components/home/FeaturedEventsCarousel';
import CategoryGrid from '../components/categories/CategoryGrid';
import EventsSection from '../components/home/EventsSection';
import Footer from '../components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CenterFocusedCarousel />
      <FeaturedEventsCarousel />
      <CategoryGrid />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Index;

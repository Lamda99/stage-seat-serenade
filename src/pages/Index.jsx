
import React from 'react';
import Header from '../components/layout/Header';
import CenterFocusedCarousel from '../components/home/CenterFocusedCarousel';
import SlideCarousel from '../components/home/SlideCarousel';
import FeaturedEventsCarousel from '../components/home/FeaturedEventsCarousel';
import CategoryGrid from '../components/categories/CategoryGrid';
import EventsSection from '../components/home/EventsSection';
import Footer from '../components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CenterFocusedCarousel />
      
      {/* New Slide Carousel Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <SlideCarousel />
        </div>
      </section>
      
      <FeaturedEventsCarousel />
      <CategoryGrid />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Index;

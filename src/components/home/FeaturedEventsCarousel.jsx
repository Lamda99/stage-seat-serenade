import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';
import { corporateEvents } from '@/data/corporateData';

const FeaturedEventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isCorporate } = useCorporateTheme();

  const casualEvents = [
    {
      id: 1,
      title: 'Folk आख्यान - Cultural Evening',
      subtitle: 'मृगनकं - नाटक',
      date: 'Saturday, 28 Jun at 7:00 PM',
      rating: '4.5',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
      venue: 'Anna Bhau Sathe Auditorium',
      price: '₹200',
      category: 'Theatre',
      language: 'Marathi',
      featured: true
    },
    {
      id: 2,
      title: 'श्यासात राजं, ध्यासात राजं',
      subtitle: 'Classical Drama Performance',
      date: 'Monday, 9 Jun at 9:30 pm',
      rating: '4.2',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      venue: 'Yashwantrao Chavan Auditorium',
      price: '₹300',
      category: 'Drama',
      language: 'Marathi',
      featured: true
    },
    {
      id: 3,
      title: 'Folk लोक - Music Festival',
      subtitle: 'Traditional Folk Music Evening',
      date: 'Sunday, June 8, 09:30PM',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      venue: 'Tilak Smarak Mandir',
      price: '₹250',
      category: 'Music',
      language: 'Hindi/Marathi',
      featured: true
    },
    {
      id: 4,
      title: 'Mahapur - Contemporary Play',
      subtitle: 'Modern Theatre Experience',
      date: 'Saturday, June 14, 08:30PM',
      rating: '3.8',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80',
      venue: 'Balgandharva Theatre',
      price: '₹400',
      category: 'Play',
      language: 'Marathi',
      featured: true
    }
  ];

  const featuredEvents = isCorporate ? corporateEvents : casualEvents;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  return (
    <section className={`py-16 px-4 ${
      isCorporate 
        ? 'bg-gradient-to-br from-slate-50 to-blue-50' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${
            isCorporate ? 'text-slate-800' : 'text-gray-800'
          }`}>
            {isCorporate ? 'Featured Professional Events' : 'Featured Events'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isCorporate ? 'text-slate-600' : 'text-gray-600'
          }`}>
            {isCorporate 
              ? 'Advance your career with premium business and professional development events'
              : 'Discover the best cultural performances and entertainment events in your city'
            }
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <Link to={`/show/${event.id}`} className="block h-full">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  
                  {/* Featured Badge */}
                  <div className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-semibold ${
                    isCorporate 
                      ? 'bg-gradient-to-r from-blue-600 to-slate-700' 
                      : 'bg-gradient-to-r from-red-600 to-red-700'
                  }`}>
                    {isCorporate ? 'PROFESSIONAL' : 'FEATURED'}
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{event.rating}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    {event.category}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="truncate">{event.date}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-red-600">{event.price} onwards</span>
                    <span className="text-xs text-gray-500">{event.language}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link to="/events">
            <Button className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              isCorporate 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}>
              {isCorporate ? 'Explore Professional Events' : 'Explore All Events'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsCarousel;

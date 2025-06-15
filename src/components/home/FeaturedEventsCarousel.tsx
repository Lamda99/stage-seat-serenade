
import React from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';
import { useQuery } from '@tanstack/react-query';
import { Show } from '@/types/show';
import { Skeleton } from '@/components/ui/skeleton';

const fetchFeaturedEvents = async (eventType: 'corporate' | 'casual'): Promise<Show[]> => {
  const response = await fetch(`/api/shows?isFeatured=true&eventType=${eventType}`);
  if (!response.ok) {
    throw new Error('Failed to fetch featured events');
  }
  return response.json();
};

const FeaturedEventsCarousel = () => {
  const { isCorporate } = useCorporateTheme();
  const eventType = isCorporate ? 'corporate' : 'casual';

  const { data: featuredEvents = [], isLoading } = useQuery({
    queryKey: ['featuredEvents', eventType],
    queryFn: () => fetchFeaturedEvents(eventType),
  });
  
  const themeStyles = {
    sectionBg: isCorporate ? 'bg-gradient-to-br from-slate-50 to-blue-50' : 'bg-gradient-to-br from-gray-50 to-white',
    headerText: isCorporate ? 'text-slate-800' : 'text-gray-800',
    subHeaderText: isCorporate ? 'text-slate-600' : 'text-gray-600',
    badgeBg: isCorporate ? 'bg-gradient-to-r from-blue-600 to-slate-700' : 'bg-gradient-to-r from-red-600 to-red-700',
    buttonClasses: isCorporate ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
  };

  const renderSkeletons = () => (
    [...Array(4)].map((_, i) => (
      <Card key={i} className="bg-white">
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    ))
  );

  return (
    <section className={`py-16 px-4 ${themeStyles.sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${themeStyles.headerText}`}>
            {isCorporate ? 'Featured Professional Events' : 'Featured Events'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${themeStyles.subHeaderText}`}>
            {isCorporate 
              ? 'Advance your career with premium business and professional development events'
              : 'Discover the best cultural performances and entertainment events in your city'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoading ? renderSkeletons() : featuredEvents.map((event) => (
            <Card key={event._id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <Link to={`/show/${event._id}`} className="block h-full">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-semibold ${themeStyles.badgeBg}`}>
                    {isCorporate ? 'PROFESSIONAL' : 'FEATURED'}
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{event.rating}</span>
                  </div>
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
                    <span className="truncate">{`${new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} at ${event.time}`}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-red-600">{event.displayPrice} onwards</span>
                    <span className="text-xs text-gray-500">{event.language}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/events">
            <Button className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${themeStyles.buttonClasses}`}>
              {isCorporate ? 'Explore Professional Events' : 'Explore All Events'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsCarousel;

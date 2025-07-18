
import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';
import { corporateEvents } from '@/data/corporateData';
import { getCategoryNames, getFeaturedCategories } from '@/data/categoriesData';

const EventsSection = () => {
  const { isCorporate } = useCorporateTheme();

  const casualEvents = [
    {
      id: 1,
      title: 'Folk आख्यान',
      subtitle: 'मृगनकं - नाटक',
      date: 'Saturday, 28 Jun at 7:00 PM',
      rating: '14.3K',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=80',
      venue: 'Anna Bhau Sathe Auditorium',
      price: '₹200 onwards',
      category: 'Theatre',
      language: 'Marathi'
    },
    {
      id: 2,
      title: 'श्यासात राजं, ध्यासात राजं',
      date: 'Monday, 9 Jun at 9:30 pm',
      rating: '14.3K',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
      venue: 'Yashwantrao Chavan Auditorium',
      price: '₹300 onwards',
      category: 'Drama',
      language: 'Marathi'
    },
    {
      id: 3,
      title: 'Folk लोक',
      date: 'Sunday, June 8, 09:30PM',
      rating: '14.3K',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80',
      venue: 'Tilak Smarak Mandir',
      price: '₹250 onwards',
      category: 'Music',
      language: 'Hindi/Marathi'
    },
    {
      id: 4,
      title: 'Mahapur',
      date: 'Saturday, June 14, 08:30PM',
      rating: '1K',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=400&q=80',
      venue: 'Balgandharva Theatre',
      price: '₹400 onwards',
      category: 'Play',
      language: 'Marathi'
    },
    {
      id: 5,
      title: 'Akshar akshar tuzeech aahe',
      date: 'Sunday, June 8, 09:30PM',
      rating: '14.3K',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=400&q=80',
      venue: 'Ganesh Kala Krida Manch',
      price: '₹180 onwards',
      category: 'Poetry',
      language: 'Marathi'
    }
  ];

  const events = isCorporate ? corporateEvents.slice(0, 5) : casualEvents;
  const categories = getFeaturedCategories(isCorporate, 6);

  return (
    <section className={`py-12 px-4 ${
      isCorporate ? 'bg-slate-50' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold ${
            isCorporate ? 'text-slate-800' : 'text-gray-800'
          }`}>
            {isCorporate ? 'Recommended Professional Events' : 'Recommended for you'}
          </h2>
          <Link to="/events">
            <Button variant="outline" className={`border-2 hover:bg-opacity-10 ${
              isCorporate 
                ? 'text-blue-600 border-blue-600 hover:bg-blue-50' 
                : 'text-red-600 border-red-600 hover:bg-red-50'
            }`}>
              See All
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white">
              <Link to={`/show/${event.id}`}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Top Recommendation Badge */}
                  <div className={`absolute top-3 left-3 text-white px-2 py-1 rounded text-xs font-semibold ${
                    isCorporate 
                      ? 'bg-blue-600' 
                      : 'bg-red-600'
                  }`}>
                    {isCorporate ? 'PROFESSIONAL PICK' : 'TOP RECOMMENDATION'}
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{event.rating}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                    {event.category}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
                    {event.title}
                  </h3>
                  
                  {event.subtitle && (
                    <p className="text-sm text-gray-600 mb-2">{event.subtitle}</p>
                  )}

                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-800">{event.price}</span>
                    <span className="text-xs text-gray-500">{event.language}</span>
                  </div>

                  <Button 
                    className={`w-full mt-3 text-white transition-colors duration-200 ${
                      isCorporate 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {isCorporate ? 'Register' : 'Book Now'}
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Categories Section */}
        <div className="mt-16">
          <h3 className={`text-2xl font-bold mb-6 ${
            isCorporate ? 'text-slate-800' : 'text-gray-800'
          }`}>
            {isCorporate ? 'Browse by Professional Categories' : 'Browse by Categories'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} to={`/events?category=${category.name}`}>
                <Card className={`cursor-pointer hover:shadow-md transition-shadow duration-200 border ${
                  isCorporate 
                    ? 'bg-gradient-to-br from-blue-50 to-slate-50 border-blue-100 hover:border-blue-200' 
                    : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-100 hover:border-red-200'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      isCorporate 
                        ? 'bg-blue-600' 
                        : 'bg-red-600'
                    }`}>
                      <span className="text-white font-bold text-lg">{category.icon}</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm">{category.name}</h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

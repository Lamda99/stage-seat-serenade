
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { useLocation } from '@/hooks/useLocation';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';
import { getCategoryNames } from '@/data/categoriesData';

const EventListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { selectedCity, popularCities, updateSelectedCity } = useLocation();
  const { isCorporate } = useCorporateTheme();

  // Get categories based on current theme
  const availableCategories = getCategoryNames(isCorporate);

  const events = [
    {
      id: 1,
      title: 'Folk आख्यान',
      subtitle: 'मृगनकं - नाटक',
      date: '28/06/2025',
      time: '7:00 PM',
      rating: '4.5',
      reviews: '14.3K',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=80',
      venue: 'Anna Bhau Sathe Auditorium',
      city: 'Pune',
      price: '₹200',
      category: 'Theatre',
      language: 'Marathi'
    },
    {
      id: 2,
      title: 'श्यासात राजं, ध्यासात राजं',
      date: '09/06/2025',
      time: '9:30 PM',
      rating: '4.2',
      reviews: '14.3K',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
      venue: 'Yashwantrao Chavan Auditorium',
      city: 'Mumbai',
      price: '₹300',
      category: 'Drama',
      language: 'Marathi'
    },
    {
      id: 3,
      title: 'Folk लोक',
      date: '08/06/2025',
      time: '9:30 PM',
      rating: '4.7',
      reviews: '14.3K',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80',
      venue: 'Tilak Smarak Mandir',
      city: 'Pune',
      price: '₹250',
      category: 'Music',
      language: 'Hindi/Marathi'
    },
    {
      id: 4,
      title: 'Mahapur',
      date: '14/06/2025',
      time: '8:30 PM',
      rating: '3.8',
      reviews: '1K',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=400&q=80',
      venue: 'Balgandharva Theatre',
      city: 'Mumbai',
      price: '₹400',
      category: 'Play',
      language: 'Marathi'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesCity = event.city === selectedCity;
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className={`text-white py-12 ${
        isCorporate 
          ? 'bg-gradient-to-r from-blue-600 to-blue-800' 
          : 'bg-gradient-to-r from-red-600 to-red-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {isCorporate ? 'Professional Events' : 'Discover Events'} in {selectedCity}
          </h1>
          <p className="text-xl opacity-90">
            {isCorporate 
              ? 'Find the perfect professional development opportunity near you'
              : 'Find the perfect entertainment experience near you'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {availableCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={updateSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {popularCities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className={`${
              isCorporate 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}>
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredEvents.length} Events Found in {selectedCity}
          </h2>
          <Select defaultValue="date">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{event.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  {event.category}
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                  {event.title}
                </h3>
                
                {event.subtitle && (
                  <p className="text-sm text-gray-600 mb-2">{event.subtitle}</p>
                )}

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{event.date}</span>
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="truncate">{event.venue}, {event.city}</span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-gray-800">{event.price} onwards</span>
                  <span className="text-xs text-gray-500">{event.language}</span>
                </div>

                <Link to={`/show/${event.id}`}>
                  <Button className={`w-full text-white ${
                    isCorporate 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}>
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found in {selectedCity} matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default EventListing;

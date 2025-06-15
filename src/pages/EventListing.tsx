import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { useLocation } from '@/hooks/useLocation';
import { useQuery } from '@tanstack/react-query';
import { Show } from '@/types/show';
import { Skeleton } from '@/components/ui/skeleton';

const fetchEventsByCity = async (city: string): Promise<Show[]> => {
  const response = await fetch(`/api/shows?city=${city}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

const EventListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const { selectedCity, popularCities, updateSelectedCity } = useLocation();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', selectedCity],
    queryFn: () => fetchEventsByCity(selectedCity),
    enabled: !!selectedCity,
  });

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.venue.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-low': {
          const priceA = parseInt(a.displayPrice?.replace(/[^0-9]/g, '') || '0');
          const priceB = parseInt(b.displayPrice?.replace(/[^0-9]/g, '') || '0');
          return priceA - priceB;
        }
        case 'price-high': {
          const priceA = parseInt(a.displayPrice?.replace(/[^0-9]/g, '') || '0');
          const priceB = parseInt(b.displayPrice?.replace(/[^0-9]/g, '') || '0');
          return priceB - priceA;
        }
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });
  }, [events, searchTerm, selectedCategory, sortBy]);
  
  const uniqueCategories = useMemo(() => {
    const categories = new Set(events.map(e => e.category));
    return ['all', ...Array.from(categories)];
  }, [events]);

  const renderSkeletons = () => (
    [...Array(6)].map((_, i) => (
      <Card key={i}>
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full mt-2" />
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Discover Events in {selectedCity}</h1>
          <p className="text-xl opacity-90">Find the perfect entertainment experience near you</p>
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
                {uniqueCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
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

            {/* The apply filters button is decorative without a form handler */}
            <Button className="bg-red-600 hover:bg-red-700">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredAndSortedEvents.length} Events Found in {selectedCity}
          </h2>
          <Select value={sortBy} onValueChange={setSortBy}>
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
          {isLoading ? renderSkeletons() : filteredAndSortedEvents.map((event) => (
            <Card key={event._id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
                  <span>{new Date(event.date).toLocaleDateString('en-IN', {day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="truncate">{event.venue}, {event.city}</span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-gray-800">{event.displayPrice} onwards</span>
                  <span className="text-xs text-gray-500">{event.language}</span>
                </div>

                <Link to={`/show/${event._id}`}>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedEvents.length === 0 && !isLoading && (
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

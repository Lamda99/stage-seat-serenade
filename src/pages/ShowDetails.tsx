
import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '../components/layout/Header';
import CastSection from '../components/show/CastSection';
import SeatSelection from '../components/booking/SeatSelection';

const ShowDetails = () => {
  const [showSeats, setShowSeats] = useState(false);

  const showData = {
    title: 'Folk लोक',
    subtitle: 'लोकसंगीताचं दिन मगर भगतलेले गुणगान...',
    director: 'निर्देशक: ओमप्र भूतकर',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80',
    rating: '4.5',
    reviews: '2.3K',
    duration: '2hr 30min',
    language: 'Marathi',
    genre: 'Folk Music, Drama',
    venue: 'Anna Bhau Sathe Auditorium',
    address: 'Off Pune-Satara Road, Bibwewadi, Pune MH 411037',
    date: 'Sunday, June 15, 2025 7:30 PM',
    description: 'A beautiful journey through the rich tradition of Marathi folk music and storytelling. This performance brings together classical elements with contemporary presentation, showcasing the cultural heritage of Maharashtra through music, dance, and narrative.'
  };

  if (showSeats) {
    return <SeatSelection showData={showData} onBack={() => setShowSeats(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${showData.image})`
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-4 mr-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-2">{showData.title}</h1>
            <p className="text-xl mb-4">{showData.subtitle}</p>
            <p className="text-lg opacity-90">{showData.director}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Show Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{showData.rating}/5</span>
                    <span className="text-gray-600">({showData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span>{showData.duration}</span>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {showData.language}
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {showData.genre}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">About the Show</h3>
                <p className="text-gray-700 leading-relaxed">{showData.description}</p>
              </CardContent>
            </Card>

            {/* Cast Section */}
            <CastSection />
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Venue Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold">{showData.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold">{showData.venue}</p>
                      <p className="text-sm text-gray-600">{showData.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Pricing */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Tickets</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-green-600">Stall Level 1</p>
                      <p className="text-sm text-gray-600">Best view</p>
                    </div>
                    <p className="font-bold text-lg">₹500</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-yellow-600">Stall Level 2</p>
                      <p className="text-sm text-gray-600">Good view</p>
                    </div>
                    <p className="font-bold text-lg">₹400</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-purple-600">Balcony</p>
                      <p className="text-sm text-gray-600">Standard view</p>
                    </div>
                    <p className="font-bold text-lg">₹300</p>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
                  onClick={() => setShowSeats(true)}
                >
                  Select Seats
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;

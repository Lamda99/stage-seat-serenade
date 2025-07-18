
import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import EnhancedHeader from '../components/layout/EnhancedHeader';
import CastSection from '../components/show/CastSection';
import RealTimeTheaterSeating from '../components/booking/RealTimeTheaterSeating';
import ThemedButton from '../components/ui/themed-button';
import ThemedCard from '../components/ui/themed-card';
import PaletteSelector from '../components/ui/palette-selector';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied' | 'selected' | 'locked';
  price: number;
}

const ShowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showPaletteSelector, setShowPaletteSelector] = useState(false);

  // Use the actual show ID from URL params, fallback to demo ID
  const showId = id || "demo-show-id";

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

  const handleSeatSelection = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length > 0) {
      // Store booking data and navigate to payment
      const bookingData = {
        show: showData,
        seats: selectedSeats,
        totalAmount: selectedSeats.reduce((total, seat) => total + seat.price, 0)
      };
      localStorage.setItem('currentBooking', JSON.stringify(bookingData));
      // Navigate to payment page (you would use useNavigate hook in a real implementation)
      window.location.href = '/payment';
    }
  };

  if (showSeats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EnhancedHeader />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button and Show Info */}
          <div className="mb-8">
            <ThemedButton 
              variant="secondary"
              className="text-gray-600 hover:text-red-600 mb-4"
              onClick={() => setShowSeats(false)}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Show Details
            </ThemedButton>
            
            <ThemedCard variant="elevated" className="p-6">
              <div className="flex items-center space-x-6">
                <img 
                  src={showData.image} 
                  alt={showData.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold show-card-title">{showData.title}</h1>
                  <p className="text-gray-600">{showData.venue}</p>
                  <p className="text-gray-600">{showData.date}</p>
                </div>
              </div>
            </ThemedCard>
          </div>

          {/* Real-Time Seating Layout */}
          <RealTimeTheaterSeating 
            showId={showId}
            onSeatSelect={handleSeatSelection}
            maxSeats={6}
          />

          {/* Proceed Button */}
          {selectedSeats.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-lg font-semibold show-card-price">
                  {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} • ₹{selectedSeats.reduce((total, seat) => total + seat.price, 0).toLocaleString('en-IN')}
                </div>
                <ThemedButton 
                  variant="payment"
                  onClick={handleProceedToPayment}
                  className="px-8 py-3 text-lg font-semibold"
                >
                  Proceed to Payment
                </ThemedButton>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center palette-diagonal-overlay"
          style={{
            backgroundImage: `url(${showData.image})`
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <Link to="/">
            <ThemedButton 
              variant="secondary"
              className="text-white hover:bg-white/10 mb-4 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </ThemedButton>
          </Link>
          
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-2 hero-text-primary">{showData.title}</h1>
            <p className="text-xl mb-4 hero-text-secondary">{showData.subtitle}</p>
            <p className="text-lg opacity-90 hero-text-secondary">{showData.director}</p>
          </div>
          
          {/* Palette Selector Toggle */}
          <div className="ml-auto">
            <ThemedButton 
              variant="secondary"
              onClick={() => setShowPaletteSelector(!showPaletteSelector)}
              className="text-white hover:bg-white/10"
            >
              🎨 Theme
            </ThemedButton>
          </div>
        </div>
      </div>

      {/* Palette Selector */}
      {showPaletteSelector && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <PaletteSelector />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Show Info */}
            <ThemedCard variant="show" className="p-6">
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

              <h3 className="text-xl font-semibold mb-3 show-card-title">About the Show</h3>
              <p className="text-gray-700 leading-relaxed">{showData.description}</p>
            </ThemedCard>

            {/* Cast Section */}
            <CastSection />
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Venue Details */}
            <ThemedCard variant="elevated" className="p-6">
              <h3 className="text-xl font-semibold mb-4 show-card-title">Event Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 show-card-price mt-1" />
                  <div>
                    <p className="font-semibold">{showData.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 show-card-price mt-1" />
                  <div>
                    <p className="font-semibold">{showData.venue}</p>
                    <p className="text-sm text-gray-600">{showData.address}</p>
                  </div>
                </div>
              </div>
            </ThemedCard>

            {/* Ticket Pricing */}
            <ThemedCard variant="payment" className="p-6">
              <h3 className="text-xl font-semibold mb-4 show-card-title">Tickets</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg show-card hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold availability-good">Premium</p>
                    <p className="text-sm text-gray-600">Best view</p>
                  </div>
                  <p className="font-bold text-lg show-card-price">₹500</p>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg show-card hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold text-blue-600">Standard</p>
                    <p className="text-sm text-gray-600">Good view</p>
                  </div>
                  <p className="font-bold text-lg show-card-price">₹400</p>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg show-card hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold text-purple-600">Economy</p>
                    <p className="text-sm text-gray-600">Standard view</p>
                  </div>
                  <p className="font-bold text-lg show-card-price">₹300</p>
                </div>
              </div>

              <ThemedButton 
                variant="hero-cta"
                className="w-full mt-6 py-3 text-lg font-semibold"
                onClick={() => setShowSeats(true)}
              >
                Select Seats (Real-Time)
              </ThemedButton>
            </ThemedCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;

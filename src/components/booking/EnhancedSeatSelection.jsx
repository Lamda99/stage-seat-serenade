
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Clock, Info, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EnhancedHeader from '../layout/EnhancedHeader';

const EnhancedSeatSelection = ({ showData, onBack }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Enhanced seat layout based on typical Indian theater configuration
 const generateSeats = () => {
  const seats = [];
  const sections = [
    { 
      name: 'Premium', 
      rows: ['A', 'B', 'C'], 
      seatsPerRow: 24, 
      price: 800, 
      color: 'gold',
      description: 'Best view, premium comfort'
    },
    { 
      name: 'Platinum', 
      rows: ['D', 'E', 'F', 'G'], 
      seatsPerRow: 26, 
      price: 600, 
      color: 'silver',
      description: 'Excellent view, comfortable seating'
    },
    { 
      name: 'Gold', 
      rows: ['H', 'I', 'J', 'K', 'L'], 
      seatsPerRow: 28, 
      price: 450, 
      color: 'bronze',
      description: 'Good view, standard comfort'
    },
    { 
      name: 'Silver', 
      rows: ['M', 'N', 'O', 'P'], 
      seatsPerRow: 30, 
      price: 300, 
      color: 'regular',
      description: 'Budget-friendly option'
    }
  ];

  sections.forEach(section => {
    section.rows.forEach(row => {
      for (let i = 1; i <= section.seatsPerRow; i++) {
        const isBlocked = (i === 7 || i === section.seatsPerRow - 6); // Aisle seats only
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          section: section.name,
          status: isBlocked ? 'blocked' : 'available',
          price: section.price,
          color: section.color,
          description: section.description
        });
      }
    });
  });

  return seats;
};


  const [seats] = useState(generateSeats());

  const handleSeatClick = (seat) => {
    if (seat.status === 'occupied' || seat.status === 'blocked') return;

    const seatIndex = selectedSeats.findIndex(s => s.id === seat.id);
    
    if (seatIndex > -1) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length < 8) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const getSeatColor = (seat) => {
    if (selectedSeats.some(s => s.id === seat.id)) return 'bg-green-500 border-green-600';
    if (seat.status === 'occupied') return 'bg-gray-400 border-gray-500 cursor-not-allowed';
    if (seat.status === 'blocked') return 'bg-transparent border-transparent';
    
    switch (seat.color) {
      case 'gold': return 'bg-yellow-200 border-yellow-300 hover:bg-yellow-300';
      case 'silver': return 'bg-gray-200 border-gray-300 hover:bg-gray-300';
      case 'bronze': return 'bg-orange-200 border-orange-300 hover:bg-orange-300';
      default: return 'bg-blue-200 border-blue-300 hover:bg-blue-300';
    }
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const convenienceFee = Math.round(totalAmount * 0.12);
  const gst = Math.round((totalAmount + convenienceFee) * 0.18);
  const grandTotal = totalAmount + convenienceFee + gst;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sectionInfo = [
    { name: 'Premium', price: '₹800', color: 'bg-yellow-200', seats: seats.filter(s => s.section === 'Premium' && s.status === 'available').length },
    { name: 'Platinum', price: '₹600', color: 'bg-gray-200', seats: seats.filter(s => s.section === 'Platinum' && s.status === 'available').length },
    { name: 'Gold', price: '₹450', color: 'bg-orange-200', seats: seats.filter(s => s.section === 'Gold' && s.status === 'available').length },
    { name: 'Silver', price: '₹300', color: 'bg-blue-200', seats: seats.filter(s => s.section === 'Silver' && s.status === 'available').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{showData?.title || 'Event Title'}</h1>
              <p className="text-gray-600">{showData?.venue || 'Venue'} | {showData?.date || 'Date & Time'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-blue-600 font-semibold">{selectedSeats.length}/8 seats</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                {/* Stage */}
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 px-12 rounded-lg inline-block text-lg font-bold shadow-lg">
                    🎭 STAGE 🎭
                  </div>
                  <p className="text-gray-500 text-sm mt-2">All eyes on stage for the best experience</p>
                </div>

                {/* Section Legend */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                  {sectionInfo.map((section) => (
                    <div key={section.name} className="flex items-center space-x-2 text-sm">
                      <div className={`w-4 h-4 ${section.color} border rounded`}></div>
                      <div>
                        <span className="font-medium">{section.name}</span>
                        <div className="text-xs text-gray-600">
                          {section.price} • {section.seats} available
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seat Layout */}
                <div className="max-w-5xl mx-auto">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map(row => (
                    <div key={row} className="flex items-center justify-center mb-2">
                      <div className="w-8 text-center font-bold text-gray-700 mr-4">
                        {row}
                      </div>
                      <div className="flex space-x-1">
                        {seats.filter(seat => seat.row === row).map(seat => (
                          <button
                            key={seat.id}
                            className={`w-6 h-6 rounded border-2 text-xs font-bold transition-all duration-200 transform hover:scale-110 ${getSeatColor(seat)} ${
                              seat.status === 'occupied' || seat.status === 'blocked' ? '' : 'cursor-pointer'
                            }`}
                            onClick={() => handleSeatClick(seat)}
                            onMouseEnter={() => setHoveredSeat(seat)}
                            onMouseLeave={() => setHoveredSeat(null)}
                            disabled={seat.status === 'occupied' || seat.status === 'blocked'}
                            title={seat.status === 'blocked' ? '' : `${seat.id} - ₹${seat.price} (${seat.section})`}
                          >
                            {seat.status === 'blocked' ? '' : seat.number}
                          </button>
                        ))}
                      </div>
                      <div className="w-8 text-center font-bold text-gray-700 ml-4">
                        {row}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6 mt-8 text-sm bg-white p-4 rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 border border-green-600 rounded"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 border border-gray-500 rounded"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-200 border border-blue-300 rounded"></div>
                    <span>Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-6 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Booking Summary</h3>
                
                {hoveredSeat && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Seat Info</span>
                    </div>
                    <div className="text-sm">
                      <p><strong>{hoveredSeat.id}</strong> - {hoveredSeat.section}</p>
                      <p>₹{hoveredSeat.price}</p>
                      <p className="text-gray-600">{hoveredSeat.description}</p>
                    </div>
                  </div>
                )}
                

                {selectedSeats.length > 0 ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-700">Selected Seats ({selectedSeats.length})</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {selectedSeats.map(seat => (
                          <div key={seat.id} className="flex justify-between items-center text-sm bg-green-50 p-2 rounded">
                            <span className="font-medium">{seat.id} ({seat.section})</span>
                            <span className="text-green-700">₹{seat.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Ticket Amount</span>
                        <span>₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Convenience Fee (12%)</span>
                        <span>₹{convenienceFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>GST (18%)</span>
                        <span>₹{gst}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                        <span>Total Amount</span>
                        <span className="text-green-600">₹{grandTotal}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold text-lg rounded-lg transition-all duration-200 transform hover:scale-105">
                      <Zap className="h-5 w-5 mr-2" />
                      Proceed to Payment
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Select seats to continue</p>
                    <p className="text-sm mt-2">Choose up to 8 seats</p>
                  </div>
                )}

                <div className="mt-6 text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded">
                  <p>• You can select up to 8 seats</p>
                  <p>• Seats will be held for 5 minutes</p>
                  <p>• All prices include applicable taxes</p>
                  <p>• Cancellation as per terms & conditions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSeatSelection;

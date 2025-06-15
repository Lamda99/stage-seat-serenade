
import React, { useState } from 'react';
import { ArrowLeft, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '../layout/Header';

interface Seat {
  id: string;
  row: string;
  number: number;
  category: 'stall1' | 'stall2' | 'balcony';
  status: 'available' | 'selected' | 'occupied';
  price: number;
}

interface SeatSelectionProps {
  showData: any;
  onBack: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ showData, onBack }) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Generate seat layout
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const categories = [
      { name: 'stall1', rows: ['A', 'B', 'C', 'D', 'E'], price: 500 },
      { name: 'stall2', rows: ['F', 'G', 'H', 'I', 'J'], price: 400 },
      { name: 'balcony', rows: ['K', 'L', 'M', 'N', 'O'], price: 300 }
    ];

    categories.forEach(category => {
      category.rows.forEach(row => {
        for (let i = 1; i <= 20; i++) {
          const isOccupied = Math.random() < 0.3; // 30% occupied seats
          seats.push({
            id: `${row}${i}`,
            row,
            number: i,
            category: category.name as any,
            status: isOccupied ? 'occupied' : 'available',
            price: category.price
          });
        }
      });
    });

    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;

    const seatIndex = selectedSeats.findIndex(s => s.id === seat.id);
    
    if (seatIndex > -1) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      // Select seat (max 6 seats)
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.some(s => s.id === seat.id)) return 'bg-green-500';
    if (seat.status === 'occupied') return 'bg-gray-400';
    
    switch (seat.category) {
      case 'stall1': return 'bg-green-200 hover:bg-green-300';
      case 'stall2': return 'bg-yellow-200 hover:bg-yellow-300';
      case 'balcony': return 'bg-purple-200 hover:bg-purple-300';
      default: return 'bg-gray-200';
    }
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{showData.title}</h1>
              <p className="text-gray-600">{showData.venue} | {showData.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-red-600">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{selectedSeats.length}/6 seats</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Stage */}
                <div className="text-center mb-8">
                  <div className="bg-gray-800 text-white py-2 px-8 rounded-lg inline-block text-sm font-semibold">
                    STAGE
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                    <span>Stall Level 1 ₹500</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                    <span>Stall Level 2 ₹400</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-200 rounded"></div>
                    <span>Balcony ₹300</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span>Unavailable</span>
                  </div>
                </div>

                {/* Seat Layout */}
                <div className="max-w-4xl mx-auto">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'].map(row => (
                    <div key={row} className="flex items-center justify-center mb-2">
                      <div className="w-8 text-center font-semibold text-gray-600 mr-4">
                        {row}
                      </div>
                      <div className="flex space-x-1">
                        {seats.filter(seat => seat.row === row).map(seat => (
                          <button
                            key={seat.id}
                            className={`w-6 h-6 rounded text-xs font-semibold transition-colors ${getSeatColor(seat)} ${
                              seat.status === 'occupied' ? 'cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.status === 'occupied'}
                          >
                            {seat.number}
                          </button>
                        ))}
                      </div>
                      <div className="w-8 text-center font-semibold text-gray-600 ml-4">
                        {row}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                
                {selectedSeats.length > 0 ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Selected Seats</h4>
                      <div className="space-y-2">
                        {selectedSeats.map(seat => (
                          <div key={seat.id} className="flex justify-between text-sm">
                            <span>{seat.id}</span>
                            <span>₹{seat.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Convenience Fee</span>
                        <span>₹{Math.round(totalAmount * 0.1)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                        <span>Grand Total</span>
                        <span>₹{totalAmount + Math.round(totalAmount * 0.1)}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold">
                      Proceed to Payment
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Select seats to continue</p>
                  </div>
                )}

                <div className="mt-6 text-xs text-gray-500">
                  <p>• You can select up to 6 seats</p>
                  <p>• Seats will be held for 5 minutes</p>
                  <p>• Ticket prices include GST</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;

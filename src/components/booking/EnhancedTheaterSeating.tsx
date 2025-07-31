import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, Star, AlertCircle } from 'lucide-react';
import SeatComponent from './SeatComponent';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied' | 'selected' | 'locked';
  price: number;
}

interface SeatLayoutProps {
  onSeatSelect: (seats: Seat[]) => void;
  maxSeats?: number;
}

const EnhancedTheaterSeating: React.FC<SeatLayoutProps> = ({ 
  onSeatSelect, 
  maxSeats = 6 
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  // Generate realistic theater seating layout
  const generateSeating = (): Seat[][] => {
    const layout: Seat[][] = [];
    
    // Premium section (rows A-C)
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row: Seat[] = [];
      const rowLetter = String.fromCharCode(65 + rowIndex); // A, B, C
      
      for (let seatNum = 1; seatNum <= 14; seatNum++) {
        // Create aisle gaps
        if (seatNum === 5 || seatNum === 11) continue;
        
        row.push({
          id: `${rowLetter}${seatNum}`,
          row: rowLetter,
          number: seatNum,
          type: 'premium',
          status: 'available',
          price: 500
        });
      }
      layout.push(row);
    }

    // Standard section (rows D-H)
    for (let rowIndex = 3; rowIndex < 8; rowIndex++) {
      const row: Seat[] = [];
      const rowLetter = String.fromCharCode(65 + rowIndex); // D, E, F, G, H
      
      for (let seatNum = 1; seatNum <= 16; seatNum++) {
        // Create aisle gaps
        if (seatNum === 5 || seatNum === 13) continue;
        
        row.push({
          id: `${rowLetter}${seatNum}`,
          row: rowLetter,
          number: seatNum,
          type: 'standard',
          status: Math.random() > 0.7 ? 'occupied' : 'available',
          price: 400
        });
      }
      layout.push(row);
    }

    // Economy section (rows I-L)
    for (let rowIndex = 8; rowIndex < 12; rowIndex++) {
      const row: Seat[] = [];
      const rowLetter = String.fromCharCode(65 + rowIndex); // I, J, K, L
      
      for (let seatNum = 1; seatNum <= 18; seatNum++) {
        // Create aisle gaps
        if (seatNum === 6 || seatNum === 14) continue;
        
        row.push({
          id: `${rowLetter}${seatNum}`,
          row: rowLetter,
          number: seatNum,
          type: 'economy',
          status: Math.random() > 0.6 ? 'occupied' : 'available',
          price: 300
        });
      }
      layout.push(row);
    }

    return layout;
  };

  const [seatingLayout] = useState<Seat[][]>(generateSeating());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied' || seat.status === 'locked') return;

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    let newSelectedSeats: Seat[];

    if (isSelected) {
      // Deselect seat
      newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
    } else {
      // Select seat (check max limit)
      if (selectedSeats.length >= maxSeats) {
        return; // Max seats reached
      }
      newSelectedSeats = [...selectedSeats, { ...seat, status: 'selected' }];
    }

    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);
  };

  const getSeatStatus = (seat: Seat): 'available' | 'occupied' | 'selected' | 'locked' => {
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    return isSelected ? 'selected' : seat.status;
  };

  const getTotalPrice = (): number => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Screen */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-t-3xl text-lg font-semibold shadow-lg">
          SCREEN
        </div>
        <div className="h-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full mx-auto w-2/3"></div>
      </div>

      {/* Legend */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">Seat Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded"></div>
              <span>Premium ₹500</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Standard ₹400</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-violet-500 rounded"></div>
              <span>Economy ₹300</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>Occupied</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seating Chart */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            {seatingLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center items-center space-x-2">
                {/* Row Label */}
                <div className="w-8 text-center font-semibold text-gray-600">
                  {row[0]?.row}
                </div>

                {/* Seats */}
                <div className="flex space-x-1">
                  {row.map((seat, seatIndex) => {
                    // Add aisle space
                    const showAisle = seat.number === 6 || seat.number === 7 || seat.number === 12 || seat.number === 13;
                    
                    return (
                      <React.Fragment key={seat.id}>
                        {showAisle && seat.number > 6 && (
                          <div className="w-8"></div>
                        )}
                        <SeatComponent
                          seatId={seat.id}
                          status={getSeatStatus(seat)}
                          type={seat.type}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.status === 'occupied' || seat.status === 'locked'}
                        />
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Row Label (right side) */}
                <div className="w-8 text-center font-semibold text-gray-600">
                  {row[0]?.row}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <Card className="bg-white/95 backdrop-blur-sm border-red-200">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-red-600" />
                  <span className="font-semibold">
                    {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(seat => (
                    <Badge key={seat.id} variant="secondary" className="bg-red-100 text-red-800">
                      {seat.id}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">
                    ₹{getTotalPrice().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                </div>
              </div>
            </div>
            
            {selectedSeats.length === maxSeats && (
              <div className="mt-4 flex items-center space-x-2 text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Maximum {maxSeats} seats can be selected</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedTheaterSeating;

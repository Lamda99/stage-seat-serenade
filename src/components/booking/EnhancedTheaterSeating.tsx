import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, AlertCircle } from 'lucide-react';
import SeatComponent from './SeatComponent';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied' | 'selected' | 'locked';
  price: number;
}

interface ShowWithSeats {
    seats: Seat[];
    maxSeatsPerBooking: number;
}

interface SeatLayoutProps {
  showId: string;
  onSeatSelect: (seats: Seat[]) => void;
  maxSeats?: number;
}

const fetchShowSeats = async (showId: string): Promise<ShowWithSeats> => {
    const response = await fetch(`/api/shows/${showId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch show data');
    }
    return response.json();
};

const EnhancedTheaterSeating: React.FC<SeatLayoutProps> = ({ 
  showId,
  onSeatSelect, 
  maxSeats: maxSeatsProp
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  const { data: show, isLoading } = useQuery({
      queryKey: ['show', showId],
      queryFn: () => fetchShowSeats(showId),
      enabled: !!showId,
  });

  const maxSeats = maxSeatsProp || show?.maxSeatsPerBooking || 6;

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied' || seat.status === 'locked') return;

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    let newSelectedSeats: Seat[];

    if (isSelected) {
      newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
    } else {
      if (selectedSeats.length >= maxSeats) {
        // TODO: Show a toast notification about max seats
        return;
      }
      newSelectedSeats = [...selectedSeats, seat];
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

  const seatsByRow = useMemo(() => {
    if (!show) return {};
    return show.seats.reduce((acc: { [key: string]: Seat[] }, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});
  }, [show]);

  const sortedRows = useMemo(() => Object.keys(seatsByRow).sort(), [seatsByRow]);
  
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <Skeleton className="h-12 w-1/3 mx-auto" />
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex justify-center items-center space-x-2">
                  <Skeleton className="w-8 h-6" />
                  <div className="flex space-x-1">
                    {[...Array(15)].map((_, j) => <Skeleton key={j} className="w-6 h-6 rounded" />)}
                  </div>
                  <Skeleton className="w-8 h-6" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <span>Premium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Standard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-violet-500 rounded"></div>
              <span>Economy</span>
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
            {sortedRows.map((row) => (
              <div key={row} className="flex justify-center items-center space-x-2">
                <div className="w-8 text-center font-semibold text-gray-600">
                  {row}
                </div>
                <div className="flex space-x-1">
                  {seatsByRow[row]
                    .sort((a, b) => a.number - b.number)
                    .map((seat) => {
                    return (
                      <SeatComponent
                        key={seat.id}
                        seatId={seat.id}
                        status={getSeatStatus(seat)}
                        type={seat.type}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.status === 'occupied' || seat.status === 'locked'}
                      />
                    );
                  })}
                </div>
                <div className="w-8 text-center font-semibold text-gray-600">
                  {row}
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

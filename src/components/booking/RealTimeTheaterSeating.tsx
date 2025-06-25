
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, Star, AlertCircle, Wifi, WifiOff, Grid, Waves } from 'lucide-react';
import SeatComponent from './SeatComponent';
import CurvedSeatGrid from './CurvedSeatGrid';
import useRealTimeSeats from '../../hooks/useRealTimeSeats';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied' | 'selected' | 'locked';
  price: number;
}

interface RealTimeTheaterSeatingProps {
  showId: string;
  onSeatSelect: (seats: Seat[]) => void;
  maxSeats?: number;
}

const RealTimeTheaterSeating: React.FC<RealTimeTheaterSeatingProps> = ({ 
  showId,
  onSeatSelect, 
  maxSeats = 6 
}) => {
  const {
    show,
    selectedSeats,
    loading,
    error,
    handleSeatSelect,
    socket
  } = useRealTimeSeats();

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const [viewMode, setViewMode] = useState<'curved' | 'grid'>('curved');

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => setConnectionStatus('connected'));
      socket.on('disconnect', () => setConnectionStatus('disconnected'));
      socket.on('connect_error', () => setConnectionStatus('disconnected'));
    }
  }, [socket]);

  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <Card className="border-red-200">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Connection Error</h3>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Show not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSeatStatus = (seat: Seat): 'available' | 'occupied' | 'selected' | 'locked' => {
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    return isSelected ? 'selected' : seat.status;
  };

  const getTotalPrice = (): number => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  // Group seats by row for grid view
  const seatsByRow = show.seats.reduce((acc: { [key: string]: Seat[] }, seat: Seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Connection Status and View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {connectionStatus === 'connected' ? (
            <>
              <Wifi className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600">Live updates active</span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-600">Connection lost</span>
            </>
          )}
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'curved' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('curved')}
            className="flex items-center space-x-2"
          >
            <Waves className="h-4 w-4" />
            <span>Curved</span>
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="flex items-center space-x-2"
          >
            <Grid className="h-4 w-4" />
            <span>Grid</span>
          </Button>
        </div>
      </div>

      {/* Legend */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">Real-Time Seat Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
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
              <div className="w-4 h-4 bg-amber-500 rounded"></div>
              <span>Locked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>Occupied</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seating Layout */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          {viewMode === 'curved' ? (
            <CurvedSeatGrid 
              seats={show.seats}
              onSeatClick={handleSeatSelect}
              selectedSeats={selectedSeats}
            />
          ) : (
            <>
              {/* Traditional Grid Layout */}
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-t-3xl text-lg font-semibold shadow-lg">
                  SCREEN
                </div>
                <div className="h-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full mx-auto w-2/3"></div>
              </div>

              <div className="space-y-4">
                {sortedRows.map((row) => (
                  <div key={row} className="flex justify-center items-center space-x-2">
                    {/* Row Label */}
                    <div className="w-8 text-center font-semibold text-gray-600">
                      {row}
                    </div>

                    {/* Seats */}
                    <div className="flex space-x-1">
                      {seatsByRow[row]
                        .sort((a: Seat, b: Seat) => a.number - b.number)
                        .map((seat: Seat) => {
                          // Add aisle space
                          const showAisle = seat.number === 6 || seat.number === 7 || seat.number === 12 || seat.number === 13;
                          return (
                            <div key={seat.id} style={{ display: 'contents' }}>
                              {showAisle && seat.number > 6 && (
                                <div className="w-8"></div>
                              )}
                              <SeatComponent
                                seatId={seat.id}
                                status={getSeatStatus(seat)}
                                type={seat.type}
                                onClick={() => handleSeatSelect(seat)}
                                disabled={seat.status === 'occupied' || (seat.status === 'locked' && !selectedSeats.find(s => s.id === seat.id))}
                              />
                            </div>
                          );
                        })}
                    </div>

                    {/* Row Label (right side) */}
                    <div className="w-8 text-center font-semibold text-gray-600">
                      {row}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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

export default RealTimeTheaterSeating;

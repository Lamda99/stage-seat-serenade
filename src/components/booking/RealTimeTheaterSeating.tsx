import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, Star, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import SeatComponent from './SeatComponent';
import useRealTimeSeats from '../../hooks/useRealTimeSeats';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  } = useRealTimeSeats(showId);

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

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

  const SEAT_RADIUS_STEP = 48; // px between rows
  const SEAT_SIZE = 32; // px size of each seat
  const SEAT_ANGLE_SPAN = Math.PI; // 180 degrees (semicircle)

  // Group seats by row
  const seatsByRow = show.seats.reduce((acc: { [key: string]: Seat[] }, seat: Seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  // Sort rows alphabetically (A, B, C, ...)
  const sortedRows = Object.keys(seatsByRow).sort();

  // For semicircular layout, calculate max seats in any row for scaling
  const maxSeatsInRow = Math.max(...sortedRows.map(row => seatsByRow[row].length));

  // --- Sectioned, Curved Layout Logic ---
  // Define section seat counts per row
  const getSectionSeatCounts = (rowIdx: number) => {
    // Left/Right: Row 0:4, 1:3, 2:2, 3+:2; Center: always 5
    const left = rowIdx === 0 ? 4 : rowIdx === 1 ? 3 : 2;
    const right = left;
    const center = 5;
    return { left, center, right };
  };

  // Get total number of rows (from the center section, which is always present)
  const totalRows = sortedRows.length;

  // Helper to get seats for a section in a row (assign dynamically by order)
  const getSectionSeats = (row: string, section: 'left' | 'center' | 'right', leftCount: number, centerCount: number, rightCount: number) => {
    const seats = seatsByRow[row]?.sort((a, b) => a.number - b.number) || [];
    if (section === 'left') return seats.slice(0, leftCount);
    if (section === 'center') return seats.slice(leftCount, leftCount + centerCount);
    if (section === 'right') return seats.slice(leftCount + centerCount, leftCount + centerCount + rightCount);
    return [];
  };

  // --- Traditional Movie Ticket Booking Layout ---
  // For each row, build a seatSlots array: [left seats, null (aisle), center seats, null (aisle), right seats]
  const getRowSeatSlots = (rowIdx: number, row: string) => {
    const { left: leftCount, center: centerCount, right: rightCount } = getSectionSeatCounts(rowIdx);
    const seats = seatsByRow[row]?.sort((a, b) => a.number - b.number) || [];
    // Assign seats in order: left, center, right
    const leftSeats = seats.slice(0, leftCount);
    const centerSeats = seats.slice(leftCount, leftCount + centerCount);
    const rightSeats = seats.slice(leftCount + centerCount, leftCount + centerCount + rightCount);
    // Build slots: [leftSeats..., null, centerSeats..., null, rightSeats...]
    return [
      ...leftSeats,
      null, // aisle
      ...centerSeats,
      null, // aisle
      ...rightSeats
    ];
  };

  // --- Render ---
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Connection Status */}
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
      </div>

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

      {/* Seating Chart - Semicircular Layout */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Traditional straight row layout */}
          <div className="flex flex-col items-center space-y-3">
            {/* Screen at the top */}
            <div className="mb-6">
              <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-t-3xl text-lg font-semibold shadow-lg">
                SCREEN
              </div>
              <div className="h-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full mx-auto w-2/3"></div>
            </div>
            {sortedRows.map((row, rowIdx) => {
              const seatSlots = getRowSeatSlots(rowIdx, row);
              return (
                <div key={row} className="flex items-center justify-center space-x-2">
                  {/* Row label */}
                  <div className="w-8 text-center font-semibold text-gray-600">{row}</div>
                  {/* Seats and aisles */}
                  <div className="flex items-center">
                    {seatSlots.map((seat, idx) => {
                      if (seat) {
                        const status = getSeatStatus(seat);
                        return (
                          <TooltipProvider key={seat.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <SeatComponent
                                    seat={seat}
                                    status={getSeatStatus(seat)}
                                    onClick={() => handleSeatSelect(seat)}
                                    disabled={seat.status === 'occupied' || (seat.status === 'locked' && !selectedSeats.find(s => s.id === seat.id))}
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <div className="text-xs">
                                  <div><b>Row:</b> {seat.row}</div>
                                  <div><b>Seat:</b> {seat.number}</div>
                                  <div><b>Price:</b> ₹{seat.price}</div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      } else {
                        // Aisle
                        return <div key={`aisle-${row}-${idx}`} className="w-8 h-8"></div>;
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Seats Summary */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">Selected Seats</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedSeats.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No seats selected</div>
          ) : (
            <div>
              <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
                <div>Seat</div>
                <div className="text-center">Price</div>
                <div className="text-center">Action</div>
              </div>
              {selectedSeats.map(seat => (
                <div key={seat.id} className="grid grid-cols-3 gap-4 text-sm items-center py-2">
                  <div className="flex items-center space-x-2">
                    <SeatComponent
                      seat={seat}
                      status="selected"
                      className="cursor-default"
                      onClick={() => handleSeatSelect(seat)}
                    />
                    <span>{`${seat.row}${seat.number}`}</span>
                  </div>
                  <div className="text-center font-semibold">
                    ₹{seat.price}
                  </div>
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSeatSelect(seat)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-lg font-semibold text-right">
                Total: ₹{getTotalPrice()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeTheaterSeating;

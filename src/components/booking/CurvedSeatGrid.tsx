
import React from 'react';
import SeatComponent from './SeatComponent';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied' | 'selected' | 'locked';
  price: number;
  x?: number;
  y?: number;
}

interface CurvedSeatGridProps {
  seats: Seat[];
  onSeatClick: (seat: Seat) => void;
  selectedSeats: Seat[];
}

const CurvedSeatGrid: React.FC<CurvedSeatGridProps> = ({ 
  seats, 
  onSeatClick, 
  selectedSeats 
}) => {
  // Calculate curved positions for seats
  const calculateCurvedPositions = (seats: Seat[]) => {
    const seatsByRow = seats.reduce((acc: { [key: string]: Seat[] }, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    }, {});

    const sortedRows = Object.keys(seatsByRow).sort();
    const positionedSeats: Seat[] = [];

    sortedRows.forEach((rowKey, rowIndex) => {
      const rowSeats = seatsByRow[rowKey].sort((a, b) => a.number - b.number);
      const totalSeats = rowSeats.length;
      const rowY = rowIndex * 50 + 100; // Base Y position for row

      // Calculate curve intensity based on row (front rows more curved)
      const curveIntensity = Math.max(0.1, 1 - (rowIndex * 0.1));
      const maxCurveHeight = 30 * curveIntensity;

      rowSeats.forEach((seat, seatIndex) => {
        // Calculate X position with curve
        const normalizedPosition = (seatIndex - (totalSeats - 1) / 2) / (totalSeats - 1);
        const baseX = 400 + normalizedPosition * 400; // Center around 400px
        
        // Apply curve to Y position (parabolic curve)
        const curveOffset = Math.pow(normalizedPosition, 2) * maxCurveHeight;
        const adjustedY = rowY + curveOffset;

        // Add aisle gaps
        let aisleOffset = 0;
        if (seat.number > 5) aisleOffset += 20;
        if (seat.number > 11) aisleOffset += 20;

        positionedSeats.push({
          ...seat,
          x: baseX + aisleOffset,
          y: adjustedY
        });
      });
    });

    return positionedSeats;
  };

  const positionedSeats = calculateCurvedPositions(seats);

  const getSeatStatus = (seat: Seat): 'available' | 'occupied' | 'selected' | 'locked' => {
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    return isSelected ? 'selected' : seat.status;
  };

  // Calculate viewport dimensions
  const minX = Math.min(...positionedSeats.map(s => s.x || 0)) - 50;
  const maxX = Math.max(...positionedSeats.map(s => s.x || 0)) + 50;
  const minY = Math.min(...positionedSeats.map(s => s.y || 0)) - 50;
  const maxY = Math.max(...positionedSeats.map(s => s.y || 0)) + 50;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg">
      <svg 
        width={maxX - minX} 
        height={maxY - minY + 100}
        viewBox={`${minX} ${minY - 50} ${maxX - minX} ${maxY - minY + 100}`}
        className="w-full"
        style={{ aspectRatio: '16/10' }}
      >
        {/* Screen representation */}
        <defs>
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="80%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        
        <rect 
          x={minX + 100} 
          y={minY} 
          width={maxX - minX - 200} 
          height="20" 
          fill="url(#screenGradient)" 
          rx="10"
        />
        <text 
          x={(minX + maxX) / 2} 
          y={minY + 15} 
          textAnchor="middle" 
          fill="white" 
          fontSize="12" 
          fontWeight="bold"
        >
          SCREEN
        </text>

        {/* Row labels */}
        {positionedSeats.reduce((acc: string[], seat) => {
          if (!acc.includes(seat.row)) acc.push(seat.row);
          return acc;
        }, []).map(row => {
          const rowSeats = positionedSeats.filter(s => s.row === row);
          const leftmostSeat = rowSeats.reduce((min, seat) => 
            (seat.x || 0) < (min.x || 0) ? seat : min
          );
          const rightmostSeat = rowSeats.reduce((max, seat) => 
            (seat.x || 0) > (max.x || 0) ? seat : max
          );
          
          return (
            <g key={row}>
              <text 
                x={(leftmostSeat.x || 0) - 30} 
                y={(leftmostSeat.y || 0) + 6} 
                textAnchor="middle" 
                fill="white" 
                fontSize="14" 
                fontWeight="bold"
              >
                {row}
              </text>
              <text 
                x={(rightmostSeat.x || 0) + 30} 
                y={(rightmostSeat.y || 0) + 6} 
                textAnchor="middle" 
                fill="white" 
                fontSize="14" 
                fontWeight="bold"
              >
                {row}
              </text>
            </g>
          );
        })}

        {/* Seats */}
        {positionedSeats.map(seat => (
          <foreignObject 
            key={seat.id} 
            x={(seat.x || 0) - 16} 
            y={(seat.y || 0) - 16} 
            width="32" 
            height="32"
          >
            <div className="cursor-pointer">
              <SeatComponent
                seatId={seat.id}
                status={getSeatStatus(seat)}
                type={seat.type}
                onClick={() => onSeatClick(seat)}
                disabled={seat.status === 'occupied' || (seat.status === 'locked' && !selectedSeats.find(s => s.id === seat.id))}
              />
            </div>
          </foreignObject>
        ))}
      </svg>
    </div>
  );
};

export default CurvedSeatGrid;

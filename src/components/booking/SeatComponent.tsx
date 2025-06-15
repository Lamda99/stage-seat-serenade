
import React from 'react';
import EnhancedSeatComponent from './EnhancedSeatComponent';

interface SeatComponentProps {
  seatId: string;
  status: 'available' | 'occupied' | 'selected' | 'locked';
  type: 'premium' | 'standard' | 'economy';
  onClick: () => void;
  disabled?: boolean;
}

const SeatComponent: React.FC<SeatComponentProps> = ({
  seatId,
  status,
  type,
  onClick,
  disabled = false
}) => {
  // Map status to enhanced component status
  const enhancedStatus = status === 'locked' ? 'viewing' : status;
  
  // Determine price based on type
  const priceMap = {
    'premium': 500,
    'standard': 400,
    'economy': 300
  };

  return (
    <EnhancedSeatComponent
      seatId={seatId}
      status={enhancedStatus}
      type={type}
      onClick={onClick}
      disabled={disabled}
      price={priceMap[type]}
      accessibility={seatId.includes('A1') || seatId.includes('A2')} // Example accessibility seats
      viewerCount={status === 'locked' ? Math.floor(Math.random() * 3) + 1 : 0}
    />
  );
};

export default SeatComponent;

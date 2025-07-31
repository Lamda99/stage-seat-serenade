import React from 'react';
import EnhancedSeatComponent from './EnhancedSeatComponent';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied' | 'selected' | 'locked';
  price: number;
}

interface SeatComponentProps {
  seat: Seat;
  status: 'available' | 'occupied' | 'selected' | 'locked';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const SeatComponent: React.FC<SeatComponentProps> = ({
  seat,
  status,
  onClick,
  disabled = false,
  className
}) => {
  // Map status to enhanced component status
  const enhancedStatus = status === '' ? 'viewing' : status;

  return (
    <EnhancedSeatComponent
      seatId={seat.id}
      status={enhancedStatus}
      type={seat.type}
      onClick={onClick}
      disabled={disabled}
      price={seat.price}
      className={className}
    />
  );
};

export default SeatComponent;

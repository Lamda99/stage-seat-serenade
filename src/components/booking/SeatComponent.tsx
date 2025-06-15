
import React from 'react';

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
  const getSeatColor = () => {
    if (status === 'selected') return '#dc2626'; // red-600
    if (status === 'occupied') return '#9ca3af'; // gray-400
    if (status === 'locked') return '#f59e0b'; // amber-500
    
    // Available seats by type
    switch (type) {
      case 'premium': return '#10b981'; // emerald-500
      case 'standard': return '#3b82f6'; // blue-500
      case 'economy': return '#8b5cf6'; // violet-500
      default: return '#6b7280'; // gray-500
    }
  };

  const getHoverColor = () => {
    if (status === 'occupied' || status === 'locked') return getSeatColor();
    return status === 'selected' ? '#b91c1c' : '#ef4444'; // darker red or lighter red
  };

  return (
    <div 
      className={`relative w-8 h-6 cursor-pointer transition-all duration-200 ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'
      }`}
      onClick={!disabled ? onClick : undefined}
      title={`${seatId} - ${type} (${status})`}
    >
      {/* SVG Seat Base */}
      <svg
        className="absolute top-0 left-0"
        width="30"
        height="20"
        viewBox="0 0 30 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 2C3 0.895431 3.89543 0 5 0H25C26.1046 0 27 0.895431 27 2V14C27 15.1046 26.1046 16 25 16H23V18C23 19.1046 22.1046 20 21 20H9C7.89543 20 7 19.1046 7 18V16H5C3.89543 16 3 15.1046 3 14V2Z"
          fill="#e5e7eb"
          stroke="#d1d5db"
          strokeWidth="0.5"
        />
      </svg>
      
      {/* Seat Cushion */}
      <div
        className="absolute top-0.5 left-1.5 rounded-t-md rounded-b-sm transition-colors duration-200"
        style={{
          backgroundColor: getSeatColor(),
          width: '16px',
          height: '14px'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = getHoverColor();
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = getSeatColor();
        }}
      />
      
      {/* Seat Number */}
      <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white pointer-events-none">
        {seatId.slice(-1)}
      </div>
    </div>
  );
};

export default SeatComponent;

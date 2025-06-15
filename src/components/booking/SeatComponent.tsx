
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

  const getDarkerShade = (color: string) => {
    // Create a darker shade for the seat base
    const colorMap: { [key: string]: string } = {
      '#dc2626': '#991b1b', // red-800
      '#9ca3af': '#6b7280', // gray-500
      '#f59e0b': '#d97706', // amber-600
      '#10b981': '#059669', // emerald-600
      '#3b82f6': '#2563eb', // blue-600
      '#8b5cf6': '#7c3aed', // violet-600
      '#6b7280': '#4b5563'  // gray-600
    };
    return colorMap[color] || '#4b5563';
  };

  return (
    <div 
      className={`relative w-8 h-8 cursor-pointer transition-all duration-200 ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'
      }`}
      onClick={!disabled ? onClick : undefined}
      title={`${seatId} - ${type} (${status})`}
    >
      {/* Seat Base/Backrest */}
      <div
        className="absolute top-0 left-1 w-6 h-6 rounded-md transition-colors duration-200 shadow-sm"
        style={{
          backgroundColor: getDarkerShade(getSeatColor()),
          border: `1px solid ${getDarkerShade(getSeatColor())}`
        }}
      />
      
      {/* Seat Cushion */}
      <div
        className="absolute top-3 left-0.5 w-7 h-4 rounded-lg transition-colors duration-200 shadow-md"
        style={{
          backgroundColor: getSeatColor(),
          border: `1px solid ${getDarkerShade(getSeatColor())}`,
          borderRadius: '8px 8px 4px 4px'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            const target = e.currentTarget as HTMLElement;
            const previous = target.previousElementSibling as HTMLElement;
            target.style.backgroundColor = getHoverColor();
            if (previous) {
              previous.style.backgroundColor = getDarkerShade(getHoverColor());
            }
          }
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLElement;
          const previous = target.previousElementSibling as HTMLElement;
          target.style.backgroundColor = getSeatColor();
          if (previous) {
            previous.style.backgroundColor = getDarkerShade(getSeatColor());
          }
        }}
      />
      
      {/* Seat Number */}
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white pointer-events-none z-10">
        {seatId.slice(-1)}
      </div>
    </div>
  );
};

export default SeatComponent;

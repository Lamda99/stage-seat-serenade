
import React, { useState } from 'react';
import { Accessibility, Users, Crown, Eye } from 'lucide-react';

interface EnhancedSeatComponentProps {
  seatId: string;
  status: 'available' | 'occupied' | 'selected' | 'locked' | 'viewing';
  type: 'premium' | 'standard' | 'economy';
  accessibility?: boolean;
  onClick: () => void;
  disabled?: boolean;
  price: number;
  viewerCount?: number;
}

const EnhancedSeatComponent: React.FC<EnhancedSeatComponentProps> = ({
  seatId,
  status,
  type,
  accessibility = false,
  onClick,
  disabled = false,
  price,
  viewerCount = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSeatClasses = () => {
    const baseClasses = "relative w-8 h-8 cursor-pointer transition-all duration-300 flex items-center justify-center text-[10px] font-bold rounded-sm";
    
    if (disabled) return `${baseClasses} cursor-not-allowed opacity-50`;
    
    const statusClasses = {
      'available': `seat-available hover:seat-hover-glow ${isHovered ? 'transform scale-110' : ''}`,
      'selected': 'seat-selected',
      'occupied': 'seat-occupied cursor-not-allowed',
      'locked': 'seat-occupied cursor-not-allowed opacity-75',
      'viewing': 'seat-viewing'
    };
    
    const typeClasses = {
      'premium': type === 'premium' ? 'seat-premium' : '',
      'standard': '',
      'economy': ''
    };

    return `${baseClasses} ${statusClasses[status]} ${typeClasses[type]}`;
  };

  const getTextColor = () => {
    if (status === 'selected') return 'text-white';
    if (status === 'occupied' || status === 'locked') return 'text-gray-400';
    if (type === 'premium') return 'text-white';
    return 'text-gray-800';
  };

  const getSeatIcon = () => {
    if (accessibility) return <Accessibility className="h-3 w-3" />;
    if (type === 'premium') return <Crown className="h-3 w-3" />;
    if (viewerCount > 0 && status === 'viewing') return <Eye className="h-3 w-3" />;
    return seatId.slice(-1);
  };

  const getTooltipContent = () => {
    const statusText = {
      'available': 'Available',
      'selected': 'Selected',
      'occupied': 'Occupied',
      'locked': 'Temporarily locked',
      'viewing': `${viewerCount} viewer${viewerCount > 1 ? 's' : ''}`
    };
    
    const typeText = {
      'premium': 'Premium',
      'standard': 'Standard',
      'economy': 'Economy'
    };

    return `${seatId} - ${typeText[type]} (${statusText[status]}) - ₹${price}`;
  };

  return (
    <div 
      className={getSeatClasses()}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={getTooltipContent()}
    >
      <span className={getTextColor()}>
        {getSeatIcon()}
      </span>
      
      {/* Real-time viewing indicator */}
      {status === 'viewing' && viewerCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">
          {viewerCount}
        </div>
      )}
      
      {/* Premium seat glow effect */}
      {type === 'premium' && status === 'available' && (
        <div className="absolute inset-0 rounded-sm opacity-30 animate-pulse bg-gradient-to-r from-yellow-400 to-orange-500" />
      )}
      
      {/* Selection animation */}
      {status === 'selected' && (
        <div className="absolute inset-0 rounded-sm animate-pulse bg-gradient-to-r from-purple-500 to-teal-500 opacity-20" />
      )}
    </div>
  );
};

export default EnhancedSeatComponent;

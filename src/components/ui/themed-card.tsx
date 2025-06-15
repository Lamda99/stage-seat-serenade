
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ThemedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'show' | 'payment' | 'hero' | 'elevated';
  palette?: boolean;
}

const ThemedCard: React.FC<ThemedCardProps> = ({ 
  className, 
  variant = 'default', 
  palette = true,
  children,
  ...props 
}) => {
  const getThemedClasses = () => {
    if (!palette) return '';
    
    const variants = {
      'default': 'bg-white border-gray-200 shadow-md hover:shadow-lg transition-all duration-300',
      'show': 'show-card cursor-pointer transform hover:scale-[1.02] transition-all duration-300',
      'payment': 'bg-white border-2 border-gray-100 shadow-xl rounded-xl overflow-hidden',
      'hero': 'bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl',
      'elevated': 'bg-white shadow-xl border-0 rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500'
    };
    
    return variants[variant] || variants.default;
  };

  return (
    <Card
      className={cn(getThemedClasses(), className)}
      {...props}
    >
      {children}
    </Card>
  );
};

export default ThemedCard;

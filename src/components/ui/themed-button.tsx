
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'variant'> {
  variant?: 'primary' | 'secondary' | 'hero-cta' | 'payment' | 'danger';
  palette?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ 
  className, 
  variant = 'primary', 
  palette = true,
  children,
  size = 'default',
  asChild = false,
  ...props 
}) => {
  const getThemedClasses = () => {
    if (!palette) return '';
    
    const variants = {
      'primary': 'palette-primary-gradient text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300',
      'secondary': 'bg-white border-2 show-card-title hover:show-card border-gray-200 hover:border-current shadow-md hover:shadow-lg transition-all duration-300',
      'hero-cta': 'hero-cta-button text-white font-semibold py-3 px-6 shadow-xl hover:shadow-2xl transition-all duration-300',
      'payment': 'payment-button font-semibold py-3 px-8 shadow-lg hover:shadow-xl transition-all duration-300',
      'danger': 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300'
    };
    
    return variants[variant] || variants.primary;
  };

  return (
    <Button
      className={cn(getThemedClasses(), className)}
      size={size}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ThemedButton;

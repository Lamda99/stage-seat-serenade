
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Building2, Ticket } from 'lucide-react';
import { useCorporateTheme } from './corporate-theme-provider';

const CorporateToggle = () => {
  const { themeMode, toggleThemeMode, isCorporate } = useCorporateTheme();

  return (
    <div className={`flex items-center space-x-3 rounded-full px-4 py-2 border transition-all duration-300 ${
      isCorporate 
        ? 'bg-blue-600 hover:bg-blue-700 border-blue-500 text-white' 
        : 'bg-red-600 hover:bg-red-700 border-red-500 text-white'
    }`}>
      <Ticket className={`h-4 w-4 transition-colors ${!isCorporate ? 'text-white' : 'text-white/60'}`} />
      
      <Switch 
        checked={isCorporate}
        onCheckedChange={toggleThemeMode}
        className="data-[state=checked]:bg-blue-800 data-[state=unchecked]:bg-red-800"
      />
      
      <Building2 className={`h-4 w-4 transition-colors ${isCorporate ? 'text-white' : 'text-white/60'}`} />
    </div>
  );
};

export default CorporateToggle;

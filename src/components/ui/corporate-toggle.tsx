
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Building2, Ticket } from 'lucide-react';
import { useCorporateTheme } from './corporate-theme-provider';

const CorporateToggle = () => {
  const { themeMode, toggleThemeMode, isCorporate } = useCorporateTheme();

  return (
    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
      <div className="flex items-center space-x-2">
        <Ticket className={`h-4 w-4 transition-colors ${!isCorporate ? 'text-white' : 'text-white/60'}`} />
        <span className={`text-sm font-medium transition-colors ${!isCorporate ? 'text-white' : 'text-white/60'}`}>
          Entertainment
        </span>
      </div>
      
      <Switch 
        checked={isCorporate}
        onCheckedChange={toggleThemeMode}
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-orange-600"
      />
      
      <div className="flex items-center space-x-2">
        <Building2 className={`h-4 w-4 transition-colors ${isCorporate ? 'text-white' : 'text-white/60'}`} />
        <span className={`text-sm font-medium transition-colors ${isCorporate ? 'text-white' : 'text-white/60'}`}>
          Corporate
        </span>
      </div>
    </div>
  );
};

export default CorporateToggle;

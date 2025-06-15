
import React, { createContext, useContext, useState, useEffect } from 'react';

type PaletteType = 'midnight-aurora' | 'sunset-cinema' | 'electric-velvet';

interface PaletteContextType {
  currentPalette: PaletteType;
  setPalette: (palette: PaletteType) => void;
  paletteConfig: {
    name: string;
    description: string;
    psychology: string;
  };
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const paletteConfigs = {
  'midnight-aurora': {
    name: 'Midnight Aurora',
    description: 'Sophisticated, trustworthy, premium experience',
    psychology: 'Creates confidence and luxury perception'
  },
  'sunset-cinema': {
    name: 'Sunset Cinema',
    description: 'Warm, theatrical, inviting atmosphere',
    psychology: 'Encourages exploration and engagement'
  },
  'electric-velvet': {
    name: 'Electric Velvet',
    description: 'Premium, exclusive, modern luxury',
    psychology: 'Positions platform as high-end service'
  }
};

interface PaletteProviderProps {
  children: React.ReactNode;
  defaultPalette?: PaletteType;
}

export const PaletteProvider: React.FC<PaletteProviderProps> = ({ 
  children, 
  defaultPalette = 'midnight-aurora' 
}) => {
  const [currentPalette, setCurrentPalette] = useState<PaletteType>(defaultPalette);

  useEffect(() => {
    // Apply palette to document root
    document.documentElement.setAttribute('data-palette', currentPalette);
    
    // Store user preference
    localStorage.setItem('theater-booking-palette', currentPalette);
  }, [currentPalette]);

  useEffect(() => {
    // Load saved palette preference
    const savedPalette = localStorage.getItem('theater-booking-palette') as PaletteType;
    if (savedPalette && savedPalette in paletteConfigs) {
      setCurrentPalette(savedPalette);
    }
  }, []);

  const setPalette = (palette: PaletteType) => {
    setCurrentPalette(palette);
  };

  const paletteConfig = paletteConfigs[currentPalette];

  return (
    <PaletteContext.Provider value={{ currentPalette, setPalette, paletteConfig }}>
      {children}
    </PaletteContext.Provider>
  );
};

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (context === undefined) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
};

export default PaletteProvider;

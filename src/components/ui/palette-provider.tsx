
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
    // Check if there's a saved palette preference
    const savedPalette = localStorage.getItem('theater-booking-palette') as PaletteType;
    
    // If a defaultPalette is explicitly provided and it's different from saved,
    // prioritize the defaultPalette and update localStorage
    if (defaultPalette && (!savedPalette || savedPalette !== defaultPalette)) {
      setCurrentPalette(defaultPalette);
      localStorage.setItem('theater-booking-palette', defaultPalette);
    } else if (savedPalette && savedPalette in paletteConfigs) {
      setCurrentPalette(savedPalette);
    } else {
      // Fallback to defaultPalette
      setCurrentPalette(defaultPalette);
      localStorage.setItem('theater-booking-palette', defaultPalette);
    }
  }, [defaultPalette]);

  useEffect(() => {
    // Apply palette to document root
    document.documentElement.setAttribute('data-palette', currentPalette);
    
    // Store user preference
    localStorage.setItem('theater-booking-palette', currentPalette);
  }, [currentPalette]);

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


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Eye, Heart, Zap } from 'lucide-react';
import { usePalette } from './palette-provider';

const PaletteSelector = () => {
  const { currentPalette, setPalette, paletteConfig } = usePalette();

  const palettes = [
    {
      id: 'midnight-aurora' as const,
      name: 'Midnight Aurora',
      icon: <Eye className="h-5 w-5" />,
      description: 'Sophisticated & Trustworthy',
      colors: ['#2D1B69', '#00D4AA', '#F7F1E3', '#FF6B6B'],
      psychology: 'Premium experience, builds confidence'
    },
    {
      id: 'sunset-cinema' as const,
      name: 'Sunset Cinema',
      icon: <Heart className="h-5 w-5" />,
      description: 'Warm & Theatrical',
      colors: ['#FF8C42', '#8B1538', '#F4E4BC', '#2C5F2D'],
      psychology: 'Inviting atmosphere, emotional connection'
    },
    {
      id: 'electric-velvet' as const,
      name: 'Electric Velvet',
      icon: <Zap className="h-5 w-5" />,
      description: 'Premium & Exclusive',
      colors: ['#00A86B', '#6B46C1', '#F8F9FA', '#FFD700'],
      psychology: 'Luxury positioning, modern sophistication'
    }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-6 w-6" />
          <span>Interface Color Psychology</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">Current: {paletteConfig.name}</Badge>
          <span className="text-sm text-gray-600">{paletteConfig.psychology}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                currentPalette === palette.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setPalette(palette.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                {palette.icon}
                <div>
                  <h3 className="font-semibold">{palette.name}</h3>
                  <p className="text-sm text-gray-600">{palette.description}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mb-3">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mb-3">{palette.psychology}</p>
              
              <Button
                variant={currentPalette === palette.id ? "default" : "outline"}
                size="sm"
                className="w-full"
              >
                {currentPalette === palette.id ? 'Active' : 'Apply'}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Color Psychology Impact</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Seat Selection:</strong> Colors influence booking confidence and perceived value</li>
            <li>• <strong>Payment Flow:</strong> Trust-building colors reduce transaction abandonment</li>
            <li>• <strong>Hero Sections:</strong> First impressions set emotional tone for entire experience</li>
            <li>• <strong>Mobile Optimization:</strong> Enhanced contrast ensures accessibility across devices</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaletteSelector;

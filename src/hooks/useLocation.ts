import { useState, useEffect } from 'react';

interface LocationData {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const popularCities = [
    'Mumbai',
    'Delhi',
    'Pune',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Ahmedabad',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kanpur'
  ];

  useEffect(() => {
    // Load saved city preference
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      setSelectedCity(savedCity);
    } else {
      // Default to Pune if no saved preference
      setSelectedCity('Pune');
    }
  }, []);

  const updateSelectedCity = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
  };

  const getCurrentLocation = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setIsLoading(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      // Here you would typically make an API call to reverse geocode the coordinates
      // For now, we'll just set a default location
      setCurrentLocation({
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        latitude,
        longitude
      });

      updateSelectedCity('Pune');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentLocation,
    selectedCity,
    isLoading,
    error,
    popularCities,
    updateSelectedCity,
    getCurrentLocation
  };
};

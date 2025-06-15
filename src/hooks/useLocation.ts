
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

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // In a real app, you would call a reverse geocoding API
          // For now, we'll simulate getting location data
          const locationData: LocationData = {
            city: 'Mumbai', // This would come from reverse geocoding
            state: 'Maharashtra',
            country: 'India',
            latitude,
            longitude
          };
          
          setCurrentLocation(locationData);
          setSelectedCity(locationData.city);
          localStorage.setItem('selectedCity', locationData.city);
          localStorage.setItem('currentLocation', JSON.stringify(locationData));
        } catch (err) {
          setError('Failed to get location details');
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const updateSelectedCity = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
  };

  const getDistanceBasedEvents = (userLat: number, userLng: number, events: any[]) => {
    // In a real implementation, this would calculate actual distances
    // For now, we'll just return events filtered by selected city
    return events.filter(event => 
      event.city === selectedCity || !event.city
    );
  };

  return {
    currentLocation,
    selectedCity,
    popularCities,
    isLoading,
    error,
    getCurrentLocation,
    updateSelectedCity,
    getDistanceBasedEvents
  };
};

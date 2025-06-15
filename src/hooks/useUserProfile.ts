
import { useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  city: string;
  preferences: {
    categories: string[];
    notifications: boolean;
  };
  provider: 'email' | 'google';
}

export interface BookingHistory {
  id: string;
  showId: string;
  showTitle: string;
  showDate: string;
  showTime: string;
  venue: string;
  seats: string[];
  totalAmount: number;
  paymentStatus: 'completed' | 'pending' | 'failed' | 'refunded';
  bookingDate: string;
  ticketNumber: string;
}

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setIsLoading(true);
    try {
      const savedUser = localStorage.getItem('user');
      const savedBookings = localStorage.getItem('bookingHistory');
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      if (savedBookings) {
        setBookingHistory(JSON.parse(savedBookings));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const addBooking = (booking: BookingHistory) => {
    const updatedBookings = [booking, ...bookingHistory];
    setBookingHistory(updatedBookings);
    localStorage.setItem('bookingHistory', JSON.stringify(updatedBookings));
  };

  const updateBookingStatus = (bookingId: string, status: BookingHistory['paymentStatus']) => {
    const updatedBookings = bookingHistory.map(booking =>
      booking.id === bookingId ? { ...booking, paymentStatus: status } : booking
    );
    setBookingHistory(updatedBookings);
    localStorage.setItem('bookingHistory', JSON.stringify(updatedBookings));
  };

  const signOut = () => {
    setUser(null);
    setBookingHistory([]);
    localStorage.removeItem('user');
    localStorage.removeItem('bookingHistory');
  };

  return {
    user,
    bookingHistory,
    isLoading,
    updateUserProfile,
    addBooking,
    updateBookingStatus,
    signOut,
    loadUserData
  };
};

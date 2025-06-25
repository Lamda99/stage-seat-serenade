import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied' | 'selected' | 'locked';
  price: number;
  lockedBy?: string;
  bookedBy?: string;
}

interface Show {
  _id: string;
  title: string;
  venue: string;
  date: string;
  seats: Seat[];
  maxSeatsPerBooking: number;
}

interface SeatUpdate {
  id: string;
  status: 'available' | 'occupied' | 'selected' | 'locked';
  lockedBy?: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const useRealTimeSeats = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Fetch shows and initialize socket connection
  useEffect(() => {
    const fetchShowsAndInitialize = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/shows`);
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }
        const shows = await response.json();
        
        if (shows && shows.length > 0) {
          const firstShow = shows[0];
          setShow(firstShow);

          // Initialize socket after getting show data
          const newSocket = io(API_BASE);
          setSocket(newSocket);

          newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('join-show', firstShow._id);
          });

          newSocket.on('seats-updated', (data: { showId: string; seats: SeatUpdate[] }) => {
            if (data.showId === firstShow._id) {
              setShow(prevShow => {
                if (!prevShow) return prevShow;
                const updatedSeats = prevShow.seats.map(seat => {
                  const update = data.seats.find(u => u.id === seat.id);
                  return update ? { ...seat, ...update } : seat;
                });
                return { ...prevShow, seats: updatedSeats };
              });
            }
          });

          newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
          });

          newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setError('Failed to connect to server');
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowsAndInitialize();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Lock seats
  const lockSeats = useCallback(async (seatIds: string[]) => {
    if (!show) return { success: false, error: 'No show selected' };

    try {
      const response = await fetch(`${API_BASE}/api/shows/${show._id}/lock-seats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seatIds, userId }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to lock seats');
      }

      return { success: true, lockedSeats: result.lockedSeats };
    } catch (err) {
      console.error('Error locking seats:', err);
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  }, [show, userId]);

  // Release seats
  const releaseSeats = useCallback(async (seatIds: string[]) => {
    if (!show) return { success: false, error: 'No show selected' };

    try {
      const response = await fetch(`${API_BASE}/api/shows/${show._id}/release-seats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seatIds, userId }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to release seats');
      }

      return { success: true };
    } catch (err) {
      console.error('Error releasing seats:', err);
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  }, [show, userId]);

  // Book seats
  const bookSeats = useCallback(async (seatIds: string[], bookingData: any) => {
    if (!show) return { success: false, error: 'No show selected' };

    try {
      const response = await fetch(`${API_BASE}/api/shows/${show._id}/book-seats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seatIds, userId, bookingData }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to book seats');
      }

      return { success: true, bookingId: result.bookingId };
    } catch (err) {
      console.error('Error booking seats:', err);
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  }, [show, userId]);

  // Handle seat selection
  const handleSeatSelect = useCallback(async (seat: Seat) => {
    if (!show || seat.status === 'occupied' || (seat.status === 'locked' && seat.lockedBy !== userId)) {
      return;
    }

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    
    if (isSelected) {
      const newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
      setSelectedSeats(newSelectedSeats);
      await releaseSeats([seat.id]);
    } else {
      if (selectedSeats.length >= (show?.maxSeatsPerBooking || 6)) {
        return;
      }
      
      const lockResult = await lockSeats([seat.id]);
      if (lockResult.success) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  }, [selectedSeats, show, userId, lockSeats, releaseSeats]);

  // Cleanup selected seats on unmount
  useEffect(() => {
    return () => {
      if (selectedSeats.length > 0) {
        releaseSeats(selectedSeats.map(s => s.id));
      }
    };
  }, [selectedSeats, releaseSeats]);

  return {
    show,
    selectedSeats,
    loading,
    error,
    userId,
    handleSeatSelect,
    lockSeats,
    releaseSeats,
    bookSeats,
    socket
  };
};

export default useRealTimeSeats;
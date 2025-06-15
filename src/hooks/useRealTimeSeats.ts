
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

const useRealTimeSeats = (showId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('join-show', showId);
    });

    newSocket.on('seats-updated', (data: { showId: string; seats: SeatUpdate[] }) => {
      if (data.showId === showId) {
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

    return () => {
      newSocket.emit('leave-show', showId);
      newSocket.disconnect();
    };
  }, [showId]);

  // Fetch initial show data
  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/shows/${showId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch show data');
        }
        const showData = await response.json();
        setShow(showData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      fetchShow();
    }
  }, [showId]);

  // Lock seats when selected
  const lockSeats = useCallback(async (seatIds: string[]) => {
    try {
      const response = await fetch(`http://localhost:3001/api/shows/${showId}/lock-seats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seatIds, userId }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        if (result.conflicts) {
          // Handle conflicts
          console.warn('Seat conflicts:', result.conflicts);
          return { success: false, conflicts: result.conflicts };
        }
        throw new Error(result.error || 'Failed to lock seats');
      }

      return { success: true, lockedSeats: result.lockedSeats };
    } catch (err) {
      console.error('Error locking seats:', err);
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  }, [showId, userId]);

  // Release seats
  const releaseSeats = useCallback(async (seatIds: string[]) => {
    try {
      const response = await fetch(`http://localhost:3001/api/shows/${showId}/release-seats`, {
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
  }, [showId, userId]);

  // Book seats
  const bookSeats = useCallback(async (seatIds: string[], bookingData: any) => {
    try {
      const response = await fetch(`http://localhost:3001/api/shows/${showId}/book-seats`, {
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
  }, [showId, userId]);

  // Handle seat selection
  const handleSeatSelect = useCallback(async (seat: Seat) => {
    if (seat.status === 'occupied' || (seat.status === 'locked' && seat.lockedBy !== userId)) {
      return;
    }

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    
    if (isSelected) {
      // Deselect seat - release lock
      const newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
      setSelectedSeats(newSelectedSeats);
      await releaseSeats([seat.id]);
    } else {
      // Select seat - acquire lock
      if (selectedSeats.length >= (show?.maxSeatsPerBooking || 6)) {
        return; // Max seats reached
      }
      
      const lockResult = await lockSeats([seat.id]);
      if (lockResult.success) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  }, [selectedSeats, show?.maxSeatsPerBooking, userId, lockSeats, releaseSeats]);

  // Release all selected seats on unmount
  useEffect(() => {
    return () => {
      if (selectedSeats.length > 0) {
        releaseSeats(selectedSeats.map(s => s.id));
      }
    };
  }, []);

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

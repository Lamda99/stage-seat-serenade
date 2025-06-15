
const express = require('express');
const Show = require('../models/Show');
const SeatLayout = require('../models/SeatLayout');
const router = express.Router();

// Get all shows
router.get('/', async (req, res) => {
  try {
    const shows = await Show.find().populate('seatLayout').sort({ date: 1 });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get show details with current seat availability
router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findById(req.params.id).populate('seatLayout');
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    // Clean expired locks before sending data
    const hasChanges = show.cleanExpiredLocks();
    if (hasChanges) {
      await show.save();
    }

    res.json(show);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new show with seat layout
router.post('/', async (req, res) => {
  try {
    const { seatLayoutId, ...showData } = req.body;
    
    // Validate seat layout exists
    const seatLayout = await SeatLayout.findById(seatLayoutId);
    if (!seatLayout) {
      return res.status(400).json({ error: 'Invalid seat layout ID' });
    }
    
    const show = new Show({
      ...showData,
      seatLayout: seatLayoutId
    });
    
    // Initialize seats from layout
    await show.initializeSeatsFromLayout();
    await show.save();
    
    await show.populate('seatLayout');
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lock seats for a user
router.post('/:id/lock-seats', async (req, res) => {
  try {
    const { seatIds, userId } = req.body;
    const show = await Show.findById(req.params.id);
    
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    // Clean expired locks first
    show.cleanExpiredLocks();

    // Check if seats are available
    const conflicts = [];
    const seatsToLock = [];

    seatIds.forEach(seatId => {
      const seat = show.seats.find(s => s.id === seatId);
      if (!seat) {
        conflicts.push({ seatId, reason: 'Seat not found' });
      } else if (seat.status === 'occupied') {
        conflicts.push({ seatId, reason: 'Seat already booked' });
      } else if (seat.status === 'locked' && seat.lockedBy !== userId) {
        conflicts.push({ seatId, reason: 'Seat locked by another user' });
      } else {
        seatsToLock.push(seat);
      }
    });

    if (conflicts.length > 0) {
      return res.status(409).json({ conflicts, message: 'Some seats are not available' });
    }

    // Lock the seats
    seatsToLock.forEach(seat => {
      seat.status = 'locked';
      seat.lockedBy = userId;
      seat.lockedAt = new Date();
    });

    await show.save();

    // Emit real-time update
    req.io.emit('seats-updated', {
      showId: show._id,
      seats: seatsToLock.map(seat => ({
        id: seat.id,
        status: seat.status,
        lockedBy: seat.lockedBy
      }))
    });

    res.json({ success: true, lockedSeats: seatsToLock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Release seat locks
router.post('/:id/release-seats', async (req, res) => {
  try {
    const { seatIds, userId } = req.body;
    const show = await Show.findById(req.params.id);
    
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    const releasedSeats = [];

    seatIds.forEach(seatId => {
      const seat = show.seats.find(s => s.id === seatId);
      if (seat && seat.lockedBy === userId) {
        seat.status = 'available';
        seat.lockedBy = null;
        seat.lockedAt = null;
        releasedSeats.push(seat);
      }
    });

    await show.save();

    // Emit real-time update
    req.io.emit('seats-updated', {
      showId: show._id,
      seats: releasedSeats.map(seat => ({
        id: seat.id,
        status: seat.status
      }))
    });

    res.json({ success: true, releasedSeats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Confirm booking
router.post('/:id/book-seats', async (req, res) => {
  try {
    const { seatIds, userId, bookingData } = req.body;
    const show = await Show.findById(req.params.id);
    
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    const bookedSeats = [];
    const conflicts = [];

    seatIds.forEach(seatId => {
      const seat = show.seats.find(s => s.id === seatId);
      if (!seat) {
        conflicts.push({ seatId, reason: 'Seat not found' });
      } else if (seat.lockedBy !== userId) {
        conflicts.push({ seatId, reason: 'Seat not locked by user' });
      } else {
        seat.status = 'occupied';
        seat.bookedBy = userId;
        seat.bookedAt = new Date();
        seat.lockedBy = null;
        seat.lockedAt = null;
        bookedSeats.push(seat);
      }
    });

    if (conflicts.length > 0) {
      return res.status(409).json({ conflicts, message: 'Booking failed due to conflicts' });
    }

    await show.save();

    // Emit real-time update
    req.io.emit('seats-updated', {
      showId: show._id,
      seats: bookedSeats.map(seat => ({
        id: seat.id,
        status: seat.status
      }))
    });

    res.json({ success: true, bookedSeats, bookingId: `BK${Date.now()}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

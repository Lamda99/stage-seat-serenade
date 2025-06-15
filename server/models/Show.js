
const mongoose = require('mongoose');

const seatInstanceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  row: { type: String, required: true },
  number: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['premium', 'standard', 'economy'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'selected', 'locked'], 
    default: 'available' 
  },
  price: { type: Number, required: true },
  lockedBy: { type: String, default: null },
  lockedAt: { type: Date, default: null },
  bookedBy: { type: String, default: null },
  bookedAt: { type: Date, default: null }
});

const showSchema = new mongoose.Schema({
  title: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  seatLayout: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SeatLayout',
    required: true 
  },
  seats: [seatInstanceSchema], // Runtime seat instances with booking status
  maxSeatsPerBooking: { type: Number, default: 6 },
  seatLockDuration: { type: Number, default: 300000 } // 5 minutes in ms
}, {
  timestamps: true
});

// Initialize seats from layout when creating a show
showSchema.methods.initializeSeatsFromLayout = async function() {
  if (!this.seatLayout) {
    throw new Error('Seat layout is required to initialize seats');
  }
  
  await this.populate('seatLayout');
  
  this.seats = this.seatLayout.seats.map(layoutSeat => ({
    id: layoutSeat.id,
    row: layoutSeat.row,
    number: layoutSeat.number,
    type: layoutSeat.type,
    status: 'available',
    price: layoutSeat.price
  }));
  
  return this;
};

// Clean up expired locks
showSchema.methods.cleanExpiredLocks = function() {
  const now = new Date();
  let hasChanges = false;

  this.seats.forEach(seat => {
    if (seat.status === 'locked' && seat.lockedAt) {
      const lockExpiry = new Date(seat.lockedAt.getTime() + this.seatLockDuration);
      if (now > lockExpiry) {
        seat.status = 'available';
        seat.lockedBy = null;
        seat.lockedAt = null;
        hasChanges = true;
      }
    }
  });

  return hasChanges;
};

module.exports = mongoose.model('Show', showSchema);

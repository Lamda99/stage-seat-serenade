
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  id: { type: String, required: true },
  row: { type: String, required: true },
  number: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['premium', 'standard', 'economy'], 
    required: true 
  },
  price: { type: Number, required: true },
  // Status will be managed in the Show model
});

const seatLayoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  venue: { type: String, required: true },
  capacity: { type: Number, required: true },
  rows: { type: Number, required: true },
  seatsPerRow: { type: Number, required: true },
  aislePositions: [{ type: Number }], // Seat numbers where aisles occur
  seats: [seatSchema],
  isTemplate: { type: Boolean, default: false },
  tags: [{ type: String }] // e.g., ['large', 'theater', 'concert-hall']
}, {
  timestamps: true
});

// Create seat layout from template configuration
seatLayoutSchema.statics.createFromTemplate = function(config) {
  const seats = [];
  
  for (let rowIndex = 0; rowIndex < config.rows.length; rowIndex++) {
    const rowConfig = config.rows[rowIndex];
    const rowLetter = String.fromCharCode(65 + rowIndex);
    
    for (let seatNum = 1; seatNum <= rowConfig.seatCount; seatNum++) {
      // Skip aisle positions
      if (config.aislePositions && config.aislePositions.includes(seatNum)) {
        continue;
      }
      
      seats.push({
        id: `${rowLetter}${seatNum}`,
        row: rowLetter,
        number: seatNum,
        type: rowConfig.type,
        price: rowConfig.price
      });
    }
  }
  
  return new this({
    name: config.name,
    description: config.description,
    venue: config.venue,
    capacity: seats.length,
    rows: config.rows.length,
    seatsPerRow: Math.max(...config.rows.map(r => r.seatCount)),
    aislePositions: config.aislePositions || [],
    seats: seats,
    isTemplate: config.isTemplate || false,
    tags: config.tags || []
  });
};

module.exports = mongoose.model('SeatLayout', seatLayoutSchema);

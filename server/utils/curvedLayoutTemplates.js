
const SeatLayout = require('../models/SeatLayout');

// Create curved theater layout template
const createCurvedTheaterLayout = () => {
  return {
    name: 'Curved Theater Layout',
    description: 'A curved theater seating arrangement with premium, standard, and economy sections',
    venue: 'Curved Theater',
    aislePositions: [5, 11, 13],
    curved: true,
    rows: [
      // Premium section (rows A-C) - closer to screen, more curved
      { type: 'premium', seatCount: 14, price: 500, curve: 0.8 },
      { type: 'premium', seatCount: 14, price: 500, curve: 0.7 },
      { type: 'premium', seatCount: 14, price: 500, curve: 0.6 },
      // Standard section (rows D-H) - moderate curve
      { type: 'standard', seatCount: 16, price: 400, curve: 0.5 },
      { type: 'standard', seatCount: 16, price: 400, curve: 0.4 },
      { type: 'standard', seatCount: 16, price: 400, curve: 0.3 },
      { type: 'standard', seatCount: 16, price: 400, curve: 0.2 },
      { type: 'standard', seatCount: 16, price: 400, curve: 0.1 },
      // Economy section (rows I-L) - minimal curve
      { type: 'economy', seatCount: 18, price: 300, curve: 0.05 },
      { type: 'economy', seatCount: 18, price: 300, curve: 0.03 },
      { type: 'economy', seatCount: 18, price: 300, curve: 0.02 },
      { type: 'economy', seatCount: 18, price: 300, curve: 0.01 }
    ],
    isTemplate: true,
    tags: ['theater', 'curved', 'premium']
  };
};

module.exports = {
  createCurvedTheaterLayout
};

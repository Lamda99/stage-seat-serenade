const SeatLayout = require('../models/SeatLayout');

// Default theater layout template
const createDefaultTheaterLayout = () => {
  return {
    name: 'Standard Theater Layout',
    description: 'A typical theater seating arrangement with premium, standard, and economy sections',
    venue: 'Standard Theater',
    aislePositions: [5, 11, 13],
    rows: [
      // Premium section (rows A-C)
      { type: 'premium', seatCount: 14, price: 500 },
      { type: 'premium', seatCount: 14, price: 500 },
      { type: 'premium', seatCount: 14, price: 500 },
      // Standard section (rows D-H)
      { type: 'standard', seatCount: 16, price: 400 },
      { type: 'standard', seatCount: 16, price: 400 },
      { type: 'standard', seatCount: 16, price: 400 },
      { type: 'standard', seatCount: 16, price: 400 },
      { type: 'standard', seatCount: 16, price: 400 },
      // Economy section (rows I-L)
      { type: 'economy', seatCount: 18, price: 300 },
      { type: 'economy', seatCount: 18, price: 300 },
      { type: 'economy', seatCount: 18, price: 300 },
      { type: 'economy', seatCount: 18, price: 300 }
    ],
    isTemplate: true,
    tags: ['theater', 'standard', 'medium']
  };
};

// Curved theater layout template
const createCurvedTheaterLayout = () => {
  return {
    name: 'Curved Theater Layout',
    description: 'A curved theater seating arrangement for immersive viewing experience',
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

// Concert hall layout template
const createConcertHallLayout = () => {
  return {
    name: 'Concert Hall Layout',
    description: 'Large concert hall with extensive seating',
    venue: 'Concert Hall',
    aislePositions: [6, 14],
    rows: [
      // VIP section (rows A-B)
      { type: 'premium', seatCount: 20, price: 800 },
      { type: 'premium', seatCount: 20, price: 800 },
      // Premium section (rows C-F)
      { type: 'premium', seatCount: 22, price: 600 },
      { type: 'premium', seatCount: 22, price: 600 },
      { type: 'premium', seatCount: 22, price: 600 },
      { type: 'premium', seatCount: 22, price: 600 },
      // Standard section (rows G-M)
      { type: 'standard', seatCount: 24, price: 400 },
      { type: 'standard', seatCount: 24, price: 400 },
      { type: 'standard', seatCount: 24, price: 400 },
      { type: 'standard', seatCount: 24, price: 400 },
      { type: 'standard', seatCount: 24, price: 400 },
      { type: 'standard', seatCount: 24, price: 400 },
      { type: 'standard', seatCount: 24, price: 400 },
      // Economy section (rows N-T)
      { type: 'economy', seatCount: 26, price: 250 },
      { type: 'economy', seatCount: 26, price: 250 },
      { type: 'economy', seatCount: 26, price: 250 },
      { type: 'economy', seatCount: 26, price: 250 },
      { type: 'economy', seatCount: 26, price: 250 },
      { type: 'economy', seatCount: 26, price: 250 },
      { type: 'economy', seatCount: 26, price: 250 }
    ],
    isTemplate: true,
    tags: ['concert', 'large', 'music']
  };
};

// Small venue layout template
const createSmallVenueLayout = () => {
  return {
    name: 'Intimate Venue Layout',
    description: 'Small intimate venue for special performances',
    venue: 'Small Theater',
    aislePositions: [4, 8],
    rows: [
      // Premium section (rows A-D)
      { type: 'premium', seatCount: 12, price: 400 },
      { type: 'premium', seatCount: 12, price: 400 },
      { type: 'standard', seatCount: 12, price: 350 },
      { type: 'standard', seatCount: 12, price: 350 },
      // Economy section (rows E-G)
      { type: 'economy', seatCount: 14, price: 250 },
      { type: 'economy', seatCount: 14, price: 250 },
      { type: 'economy', seatCount: 14, price: 250 }
    ],
    isTemplate: true,
    tags: ['small', 'intimate', 'theater']
  };
};

// Initialize default layouts
const initializeDefaultLayouts = async () => {
  try {
    const existingLayouts = await SeatLayout.find({ isTemplate: true });
    
    if (existingLayouts.length === 0) {
      console.log('Creating default seat layout templates...');
      
      const defaultTheater = SeatLayout.createFromTemplate(createDefaultTheaterLayout());
      const curvedTheater = SeatLayout.createFromTemplate(createCurvedTheaterLayout());
      const concertHall = SeatLayout.createFromTemplate(createConcertHallLayout());
      const smallVenue = SeatLayout.createFromTemplate(createSmallVenueLayout());
      
      await Promise.all([
        defaultTheater.save(),
        curvedTheater.save(),
        concertHall.save(),
        smallVenue.save()
      ]);
      
      console.log('Default seat layout templates created successfully');
      return { defaultTheater, curvedTheater, concertHall, smallVenue };
    }
    
    return existingLayouts;
  } catch (error) {
    console.error('Error initializing default layouts:', error);
    throw error;
  }
};

module.exports = {
  createDefaultTheaterLayout,
  createCurvedTheaterLayout,
  createConcertHallLayout,
  createSmallVenueLayout,
  initializeDefaultLayouts
};

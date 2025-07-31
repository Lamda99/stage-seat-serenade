const SeatLayout = require('../models/SeatLayout');

// Custom layout with 5 rows: 20, 18, 16, 14, 12 seats respectively
const createCustomLayout = () => {
  return {
    name: 'Custom Theater Layout',
    description: '5-row layout with descending number of seats per row',
    venue: 'My Custom Theater',
    aislePositions: [5, 10, 15], // Adjust as needed for your UI
    rows: [
      { type: 'premium', seatCount: 20, price: 500 },
      { type: 'premium', seatCount: 18, price: 500 },
      { type: 'standard', seatCount: 16, price: 400 },
      { type: 'standard', seatCount: 14, price: 400 },
      { type: 'economy', seatCount: 12, price: 300 }
    ],
    isTemplate: true,
    tags: ['custom', 'descending', '5rows']
  };
};

// Initialize only the custom layout
const initializeDefaultLayouts = async () => {
  try {
    const layouts = await SeatLayout.find({ isTemplate: true });
    const layoutNames = layouts.map(l => l.name);

    const promises = [];

    if (!layoutNames.includes('Custom Theater Layout')) {
      console.log('Creating Custom Theater Layout...');
      const customLayout = SeatLayout.createFromTemplate(createCustomLayout());
      promises.push(customLayout.save());
    }

    if (promises.length > 0) {
      await Promise.all(promises);
      console.log('Missing seat layouts created successfully.');
    } else {
      console.log('All default templates already exist.');
    }

    return await SeatLayout.find({ isTemplate: true });
  } catch (error) {
    console.error('Error initializing default layouts:', error);
    throw error;
  }
};

module.exports = {
  createCustomLayout,
  initializeDefaultLayouts
};

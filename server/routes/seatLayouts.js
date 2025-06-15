
const express = require('express');
const SeatLayout = require('../models/SeatLayout');
const router = express.Router();

// Get all seat layouts
router.get('/', async (req, res) => {
  try {
    const { isTemplate, venue, tags } = req.query;
    let query = {};
    
    if (isTemplate !== undefined) {
      query.isTemplate = isTemplate === 'true';
    }
    
    if (venue) {
      query.venue = new RegExp(venue, 'i');
    }
    
    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }
    
    const layouts = await SeatLayout.find(query).sort({ createdAt: -1 });
    res.json(layouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific seat layout
router.get('/:id', async (req, res) => {
  try {
    const layout = await SeatLayout.findById(req.params.id);
    if (!layout) {
      return res.status(404).json({ error: 'Seat layout not found' });
    }
    res.json(layout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new seat layout
router.post('/', async (req, res) => {
  try {
    const layout = new SeatLayout(req.body);
    await layout.save();
    res.status(201).json(layout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create layout from template
router.post('/from-template', async (req, res) => {
  try {
    const layout = SeatLayout.createFromTemplate(req.body);
    await layout.save();
    res.status(201).json(layout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update seat layout
router.put('/:id', async (req, res) => {
  try {
    const layout = await SeatLayout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!layout) {
      return res.status(404).json({ error: 'Seat layout not found' });
    }
    res.json(layout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete seat layout
router.delete('/:id', async (req, res) => {
  try {
    const layout = await SeatLayout.findByIdAndDelete(req.params.id);
    if (!layout) {
      return res.status(404).json({ error: 'Seat layout not found' });
    }
    res.json({ message: 'Seat layout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

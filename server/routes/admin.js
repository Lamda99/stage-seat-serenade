
const express = require('express');
const Show = require('../models/Show');
const router = express.Router();

// Get all shows
router.get('/shows', async (req, res) => {
  try {
    const shows = await Show.find({}).sort({ date: -1 });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new show
router.post('/shows', async (req, res) => {
  try {
    const { title, venue, date, seats } = req.body;
    
    const show = new Show({
      title,
      venue,
      date: new Date(date),
      seats: seats || []
    });
    
    await show.save();
    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update show
router.put('/shows/:id', async (req, res) => {
  try {
    const { title, venue, date, seats } = req.body;
    
    const show = await Show.findByIdAndUpdate(
      req.params.id,
      {
        title,
        venue,
        date: new Date(date),
        seats: seats || []
      },
      { new: true }
    );
    
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    
    res.json(show);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete show
router.delete('/shows/:id', async (req, res) => {
  try {
    const show = await Show.findByIdAndDelete(req.params.id);
    
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    
    res.json({ message: 'Show deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

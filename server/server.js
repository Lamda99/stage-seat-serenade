
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const showRoutes = require('./routes/shows');
const seatLayoutRoutes = require('./routes/seatLayouts');
const Show = require('./models/Show');
const { initializeDefaultLayouts } = require('./utils/layoutTemplates');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Make io available to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/shows', showRoutes);
app.use('/api/seat-layouts', seatLayoutRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join show room for real-time updates
  socket.on('join-show', (showId) => {
    socket.join(`show-${showId}`);
    console.log(`User ${socket.id} joined show ${showId}`);
  });

  // Leave show room
  socket.on('leave-show', (showId) => {
    socket.leave(`show-${showId}`);
    console.log(`User ${socket.id} left show ${showId}`);
  });

  // Handle seat selection events
  socket.on('seat-hover', (data) => {
    socket.to(`show-${data.showId}`).emit('user-hovering', {
      seatId: data.seatId,
      userId: socket.id
    });
  });

  socket.on('seat-unhover', (data) => {
    socket.to(`show-${data.showId}`).emit('user-stopped-hovering', {
      seatId: data.seatId,
      userId: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Cleanup expired locks periodically
setInterval(async () => {
  try {
    const shows = await Show.find({});
    for (const show of shows) {
      const hasChanges = show.cleanExpiredLocks();
      if (hasChanges) {
        await show.save();
        // Emit updates for cleaned up seats
        const availableSeats = show.seats
          .filter(seat => seat.status === 'available')
          .map(seat => ({ id: seat.id, status: seat.status }));
        
        if (availableSeats.length > 0) {
          io.emit('seats-updated', {
            showId: show._id,
            seats: availableSeats
          });
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up expired locks:', error);
  }
}, 30000); // Run every 30 seconds

// Create sample show data if none exists
async function initializeSampleData() {
  try {
    // Initialize default layouts first
    const layouts = await initializeDefaultLayouts();
    
    const existingShow = await Show.findOne();
    if (!existingShow) {
      console.log('Creating sample show with default layout...');
      
      // Get the default theater layout
      const defaultLayout = Array.isArray(layouts) 
        ? layouts.find(l => l.name === 'Standard Theater Layout')
        : layouts.defaultTheater;
      
      if (defaultLayout) {
        const sampleShow = new Show({
          title: 'Folk लोक',
          venue: 'Anna Bhau Sathe Auditorium',
          date: new Date('2025-06-15T19:30:00Z'),
          seatLayout: defaultLayout._id
        });

        await sampleShow.initializeSeatsFromLayout();
        
        // Add some random occupied seats for demo
        sampleShow.seats.forEach(seat => {
          if (Math.random() > 0.8) {
            seat.status = 'occupied';
            seat.bookedBy = 'demo-user';
            seat.bookedAt = new Date();
          }
        });
        
        await sampleShow.save();
        console.log('Sample show data created');
      }
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeSampleData();
});

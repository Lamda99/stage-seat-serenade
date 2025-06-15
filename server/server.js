
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const showRoutes = require('./routes/shows');
const Show = require('./models/Show');

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
    const existingShow = await Show.findOne();
    if (!existingShow) {
      const sampleSeats = [];
      
      // Premium section (rows A-C)
      for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        const rowLetter = String.fromCharCode(65 + rowIndex);
        for (let seatNum = 1; seatNum <= 14; seatNum++) {
          if (seatNum === 5 || seatNum === 11) continue;
          sampleSeats.push({
            id: `${rowLetter}${seatNum}`,
            row: rowLetter,
            number: seatNum,
            type: 'premium',
            status: Math.random() > 0.8 ? 'occupied' : 'available',
            price: 500
          });
        }
      }

      // Standard section (rows D-H)
      for (let rowIndex = 3; rowIndex < 8; rowIndex++) {
        const rowLetter = String.fromCharCode(65 + rowIndex);
        for (let seatNum = 1; seatNum <= 16; seatNum++) {
          if (seatNum === 5 || seatNum === 13) continue;
          sampleSeats.push({
            id: `${rowLetter}${seatNum}`,
            row: rowLetter,
            number: seatNum,
            type: 'standard',
            status: Math.random() > 0.7 ? 'occupied' : 'available',
            price: 400
          });
        }
      }

      // Economy section (rows I-L)
      for (let rowIndex = 8; rowIndex < 12; rowIndex++) {
        const rowLetter = String.fromCharCode(65 + rowIndex);
        for (let seatNum = 1; seatNum <= 18; seatNum++) {
          if (seatNum === 6 || seatNum === 14) continue;
          sampleSeats.push({
            id: `${rowLetter}${seatNum}`,
            row: rowLetter,
            number: seatNum,
            type: 'economy',
            status: Math.random() > 0.6 ? 'occupied' : 'available',
            price: 300
          });
        }
      }

      const sampleShow = new Show({
        title: 'Folk लोक',
        venue: 'Anna Bhau Sathe Auditorium',
        date: new Date('2025-06-15T19:30:00Z'),
        seats: sampleSeats
      });

      await sampleShow.save();
      console.log('Sample show data created');
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

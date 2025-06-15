
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
    origin: ["http://localhost:8080", "http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Make io available to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Database connection with better error handling
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully');
    
    // Initialize sample data after successful connection
    await initializeSampleData();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

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
    if (mongoose.connection.readyState !== 1) return;
    
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
        console.log('✅ Sample show data created successfully');
      }
    } else {
      console.log('✅ Sample data already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing sample data:', error);
  }
}

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Theater booking server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔌 Socket.IO enabled for real-time updates`);
  connectDB();
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n⏹️ Shutting down server gracefully...');
  server.close(() => {
    mongoose.connection.close(() => {
      console.log('✅ Server and database connections closed');
      process.exit(0);
    });
  });
});

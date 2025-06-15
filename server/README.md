
# Theater Booking Backend

This is the real-time backend server for the theater booking platform with MongoDB integration and Socket.IO for live updates.

## Features

- Real-time seat availability updates
- Seat locking mechanism (5-minute timeout)
- Conflict resolution for concurrent bookings
- MongoDB data persistence
- RESTful API endpoints
- WebSocket support for live updates

## Setup Instructions

1. Install dependencies:
```bash
cd server
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3001
NODE_ENV=development
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/shows/:id` - Get show details with current seat availability
- `POST /api/shows/:id/lock-seats` - Lock seats for a user (5-minute timeout)
- `POST /api/shows/:id/release-seats` - Release locked seats
- `POST /api/shows/:id/book-seats` - Confirm seat booking

## Socket.IO Events

- `join-show` - Join a show room for real-time updates
- `leave-show` - Leave a show room
- `seats-updated` - Broadcast when seat status changes
- `seat-hover` - Track user seat hovering
- `user-hovering` - Notify other users of hovering activity

## Database Schema

### Show Model
- title, venue, date
- seats array with status tracking
- seat locking mechanism
- automatic cleanup of expired locks

### Seat Model
- id, row, number, type, price
- status: available, occupied, selected, locked
- locking metadata: lockedBy, lockedAt
- booking metadata: bookedBy, bookedAt

## Real-Time Features

- Live seat availability updates
- Automatic lock expiration (5 minutes)
- Conflict detection and resolution
- User presence indicators
- Concurrent booking prevention

The server automatically creates sample data on first run for testing purposes.

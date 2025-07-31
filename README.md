# BookREVent - Theater & Cultural Event Booking Platform

A modern theater and cultural event booking platform built with React, TypeScript, and Node.js.

## Project Overview

BookREVent is a comprehensive ticket booking platform similar to BookMyShow, designed for theater shows, plays, and cultural events across India. The platform features real-time seat selection, user authentication, and a modern responsive interface.

## Tech Stack

**Frontend:**
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for components
- Socket.IO for real-time updates

**Backend:**
- Node.js with Express
- MongoDB for database
- Socket.IO for real-time communication
- Firebase for authentication

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd stage-seat-serenade
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

4. Set up environment variables:
Create a `.env` file in the server directory with:
```
MONGODB_URI=mongodb://localhost:27017/theater-booking
JWT_SECRET=your-jwt-secret
PORT=3001
```

5. Start the development servers:

Backend:
```bash
cd server
npm start
```

Frontend (in a new terminal):
```bash
npm run dev
```

## Features

- 🎭 Browse theater shows and events
- 🪑 Real-time seat selection and booking
- 👤 User authentication and profiles
- 📱 Responsive design for all devices
- ⚡ Real-time updates using WebSocket
- 🎨 Modern UI with dual theme support

## Project Structure

```
├── src/                 # Frontend source code
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── server/             # Backend source code
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── utils/          # Server utilities
└── public/             # Static assets
```


# Theater Booking Platform - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Data Management](#data-management)
6. [Component Architecture](#component-architecture)
7. [Real-Time Features](#real-time-features)
8. [Theming System](#theming-system)
9. [API & Backend](#api--backend)
10. [Payment Integration](#payment-integration)
11. [Deployment & Configuration](#deployment--configuration)
12. [Development Guidelines](#development-guidelines)
13. [File References](#file-references)

---

## Project Overview

### Mission Statement
This is a comprehensive theater ticket booking platform similar to BookMyShow, designed specifically for the Indian entertainment market. The platform prioritizes user experience, real-time seat management, and scalable architecture to handle high-traffic booking scenarios during popular show releases.

### Key Objectives
- **Real-time seat booking** with conflict resolution
- **Dual-theme support** (Casual Entertainment + Corporate Events)
- **Multi-city event management**
- **Responsive design** across all devices
- **Indian market localization** (dates, currency, regional content)

---

## Architecture & Technology Stack

### Frontend Technologies
- **React 18.3.1** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Shadcn/UI** for consistent component library
- **React Router DOM** for client-side routing

### State Management & Data Fetching
- **TanStack React Query** for server state management
- **React Context** for theme and user state
- **Custom hooks** for business logic encapsulation

### Real-Time Communication
- **Socket.io-client** for WebSocket connections
- **Real-time seat updates** and booking conflicts

### Backend Technologies
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.io** for real-time features
- **JWT** for authentication

---

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Shadcn)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── home/            # Homepage-specific components
│   ├── booking/         # Booking flow components
│   ├── categories/      # Category management
│   └── show/            # Show detail components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── data/                # Static data and configurations
├── types/               # TypeScript type definitions
├── lib/                 # Utility functions
└── styles/              # Global styles and themes

server/
├── models/              # Database schemas
├── routes/              # API endpoint handlers
└── utils/               # Server utilities
```

---

## Core Features

### 1. Dual Theme System

The platform supports two distinct experiences:

#### Casual Entertainment Theme
- **Target Audience**: General public seeking entertainment
- **Color Scheme**: Red/Orange gradients
- **Categories**: Theatre, Music, Dance, Comedy, Drama, Poetry, Sports, Festivals
- **Language**: Mix of English and regional languages (Marathi)
- **Branding**: "Book Now" buttons, entertainment-focused messaging

#### Corporate Events Theme
- **Target Audience**: Professionals seeking development opportunities
- **Color Scheme**: Blue/Slate gradients
- **Categories**: Leadership, Technology, Finance, Marketing, Operations, HR
- **Language**: Professional English terminology
- **Branding**: "Register" buttons, business-focused messaging

**Implementation Files:**
- `src/components/ui/corporate-theme-provider.tsx` - Theme context
- `src/components/ui/corporate-toggle.tsx` - Theme switcher
- `src/styles/corporate-theme.css` - Theme-specific styles

### 2. Category Management System

**Centralized Category Data:**
- Located in `src/data/categoriesData.ts`
- Unified interface for both casual and corporate categories
- Utility functions for filtering and accessing categories

**Category Structure:**
```typescript
interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  eventCount: string;
  isCorporate?: boolean;
}
```

**Key Functions:**
- `getCasualCategories()` - Returns entertainment categories
- `getCorporateCategories()` - Returns professional categories
- `getFeaturedCategories()` - Returns trending categories
- `getCategoryById()` - Lookup by ID

### 3. Location-Based Event Management

**Multi-City Support:**
- Popular cities: Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, Kolkata
- City-specific event filtering
- Location context maintained throughout user session

**Implementation:**
- `src/hooks/useLocation.ts` - Location state management
- Persistent city selection across page navigation
- Default city selection based on user preference

### 4. Event Discovery & Listing

**Event Data Structure:**
Events contain comprehensive information including:
- Basic details (title, description, venue, date/time)
- Pricing information (multiple tiers)
- Media assets (images, promotional content)
- Metadata (language, genre, rating)
- Location specifics (venue address, city)

**Event Display Components:**
- `src/components/home/EventsSection.tsx` - Homepage event showcase
- `src/pages/EventListing.tsx` - Comprehensive event browser
- Responsive grid layouts for optimal viewing

---

## Data Management

### Static Data Sources

#### 1. Categories Data (`src/data/categoriesData.ts`)
- **Purpose**: Central repository for all event categories
- **Structure**: Unified interface supporting both themes
- **Usage**: Category filtering, navigation, event classification

#### 2. Carousel Data (`src/data/carouselData.ts`)
- **Purpose**: Featured content for homepage carousel
- **Structure**: Rich media content with promotional information
- **Usage**: Homepage hero section, featured event promotion

#### 3. Corporate Data (`src/data/corporateData.ts`)
- **Purpose**: Professional event listings and corporate-specific content
- **Structure**: Business-focused event information
- **Usage**: Corporate theme event display

### Dynamic Data Flow

#### Event Loading Process:
1. **Initial Load**: Static data provides immediate content
2. **API Integration**: Server-side data fetches for real-time information
3. **Real-time Updates**: WebSocket connections for live data synchronization

#### Search & Filtering:
1. **Client-side Filtering**: Immediate response for category/location filters
2. **Server-side Search**: Complex queries and full-text search
3. **Caching Strategy**: React Query for efficient data management

---

## Component Architecture

### Design Principles

#### 1. Component-First Development
- Every feature built as reusable, self-contained component
- Encapsulated state management and error handling
- Props-based customization for reusability

#### 2. Responsive Design Priority
- Mobile-first development approach
- Breakpoint system: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, ultrawide
- Flexible grid systems and spacing

#### 3. Accessibility Standards
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### Key Component Categories

#### UI Foundation (`src/components/ui/`)
- **Base Components**: Button, Card, Input, Select (Shadcn/UI)
- **Themed Components**: ThemedButton, ThemedCard for dual-theme support
- **Custom Components**: PaletteSelector, CorporateToggle

#### Layout Components (`src/components/layout/`)
- **Header**: Navigation, search, theme toggle, user menu
- **Footer**: Links, social media, company information
- **EnhancedHeader**: Extended header with additional features

#### Feature Components

##### Home Page (`src/components/home/`)
- **CenterFocusedCarousel**: Hero section with featured events
- **EventsSection**: Curated event recommendations
- **FeaturedEventsCarousel**: Horizontal scrolling event list
- **CategoryGrid**: Category browsing interface

##### Booking System (`src/components/booking/`)
- **RealTimeTheaterSeating**: Live seat selection with WebSocket updates
- **EnhancedTheaterSeating**: Static seat layout (fallback)
- **SeatComponent**: Individual seat representation
- **EnhancedSeatComponent**: Advanced seat with animations and states

---

## Real-Time Features

### Real-Time Seat Booking System

The platform's most critical feature handles concurrent seat selection with sophisticated conflict resolution.

#### Core Components

**1. useRealTimeSeats Hook (`src/hooks/useRealTimeSeats.ts`)**
- **Purpose**: Manages WebSocket connections and seat state
- **Features**:
  - Real-time seat status updates
  - Conflict detection and resolution
  - Automatic seat lock/release management
  - User session handling

**Key Functions:**
```typescript
// Seat locking for temporary reservation
const lockSeats = async (seatIds: string[]) => { ... }

// Release seats when user deselects
const releaseSeats = async (seatIds: string[]) => { ... }

// Final booking confirmation
const bookSeats = async (seatIds: string[], bookingData: any) => { ... }

// Handle user seat selection
const handleSeatSelect = async (seat: Seat) => { ... }
```

**2. RealTimeTheaterSeating Component**
- **Location**: `src/components/booking/RealTimeTheaterSeating.tsx`
- **Features**:
  - Live connection status display
  - Visual seat state representation
  - Conflict resolution UI
  - Selection summary and pricing

#### Seat States & Conflict Resolution

**Seat Status Types:**
- `available` - Open for selection
- `occupied` - Permanently booked
- `selected` - Currently chosen by user
- `locked` - Temporarily reserved by another user

**Conflict Scenarios:**
1. **Multiple users select same seat**: First user gets priority, others receive conflict notification
2. **Network disconnection**: Automatic reconnection with state synchronization
3. **Session timeout**: Automatic release of locked seats
4. **Browser crash**: Server-side cleanup of abandoned locks

**Real-time Updates:**
- WebSocket events: `seats-updated`, `booking-confirmed`, `conflict-detected`
- Optimistic UI updates with server confirmation
- Automatic state reconciliation on reconnection

---

## Theming System

### Dual Theme Architecture

The platform implements a sophisticated theming system supporting both casual entertainment and corporate professional experiences.

#### Theme Provider System

**1. Corporate Theme Provider (`src/components/ui/corporate-theme-provider.tsx`)**
- **Context Management**: Global theme state
- **Persistence**: Local storage for user preference
- **Default Behavior**: Casual theme as default

**2. Palette System (`src/components/ui/palette-provider.tsx`)**
- **Advanced Theming**: Multiple color palette options
- **Dynamic Switching**: Real-time theme updates
- **CSS Custom Properties**: Efficient style updates

#### Color Schemes & Styling

**Casual Theme Colors:**
- Primary: Red gradients (`from-red-600 to-red-800`)
- Secondary: Orange accents
- Interactive: Red hover states and focus rings

**Corporate Theme Colors:**
- Primary: Blue gradients (`from-blue-600 to-blue-800`)
- Secondary: Slate accents
- Interactive: Professional blue states

**Implementation Pattern:**
```jsx
const { isCorporate } = useCorporateTheme();

className={`${
  isCorporate 
    ? 'bg-blue-600 hover:bg-blue-700' 
    : 'bg-red-600 hover:bg-red-700'
}`}
```

#### Themed Components

**1. ThemedButton (`src/components/ui/themed-button.tsx`)**
- Automatically adapts to current theme
- Variant support: primary, secondary, hero-cta, payment
- Consistent behavior across themes

**2. ThemedCard (`src/components/ui/themed-card.tsx`)**
- Theme-aware card styling
- Variants: default, elevated, show, payment
- Responsive design integration

---

## API & Backend

### Server Architecture

#### Database Models

**1. Show Model (`server/models/Show.js`)**
- **Purpose**: Core show information and seat management
- **Key Features**:
  - Dynamic seat initialization from layouts
  - Real-time seat status tracking
  - Conflict resolution logic
  - Booking state management

**Schema Structure:**
```javascript
{
  title: String,
  venue: String,
  date: Date,
  seatLayout: ObjectId,
  seats: [seatInstanceSchema],
  maxSeatsPerBooking: Number,
  seatLockDuration: Number
}
```

**2. SeatLayout Model (`server/models/SeatLayout.js`)**
- **Purpose**: Template-based seat configuration
- **Features**:
  - Flexible layout creation
  - Template system for common configurations
  - Venue-specific customization
  - Capacity and pricing management

#### API Endpoints

**Show Management (`server/routes/shows.js`)**
- `GET /api/shows` - List all shows
- `GET /api/shows/:id` - Get specific show with real-time seat data
- `POST /api/shows` - Create new show with seat layout
- `POST /api/shows/:id/lock-seats` - Temporary seat reservation
- `POST /api/shows/:id/release-seats` - Release seat locks
- `POST /api/shows/:id/book-seats` - Confirm final booking

**Seat Layout Management (`server/routes/seatLayouts.js`)**
- `GET /api/seatLayouts` - List available layouts
- `GET /api/seatLayouts/:id` - Get specific layout
- `POST /api/seatLayouts` - Create custom layout
- `POST /api/seatLayouts/from-template` - Generate from template

#### Real-Time Communication

**WebSocket Events:**
- `join-show` - User joins show room
- `leave-show` - User leaves show room
- `seats-updated` - Broadcast seat state changes
- `booking-confirmed` - Notify successful bookings
- `conflict-detected` - Handle booking conflicts

**Connection Management:**
- Automatic reconnection on network issues
- Session cleanup on disconnect
- Room-based event broadcasting

---

## Payment Integration

### Payment Flow Architecture

The platform is designed to integrate with multiple payment gateways, with primary focus on Razorpay for the Indian market.

#### Payment States & Flow

**1. Seat Selection Phase**
- Real-time seat locking during selection
- Price calculation with dynamic updates
- Maximum seat limit enforcement (default: 6 seats)

**2. Payment Initiation**
- Booking data compilation and validation
- Temporary reservation extension
- Payment gateway session creation

**3. Payment Processing**
- Secure payment gateway redirection
- Real-time payment status updates
- Booking confirmation or failure handling

**4. Post-Payment Actions**
- Seat status finalization (occupied/available)
- Booking record creation
- Confirmation notifications

#### Implementation Considerations

**Indian Market Requirements:**
- **GST Calculation**: Automatic tax computation
- **Multiple Payment Methods**: Cards, UPI, Net Banking, Wallets
- **Currency Format**: ₹ symbol, Indian number formatting
- **Pricing Tiers**: Premium (₹500), Standard (₹400), Economy (₹300)

**Security Measures:**
- PCI compliance standards
- Encrypted payment data transmission
- Secure session management
- Fraud detection integration

---

## Deployment & Configuration

### Environment Setup

#### Development Configuration
- **Frontend**: Vite development server on port 5173
- **Backend**: Express server on port 3001
- **WebSocket**: Socket.io on same port as backend
- **Database**: MongoDB connection string

#### Production Considerations
- **Frontend Deployment**: Static site deployment (Vercel/Netlify)
- **Backend Hosting**: Node.js hosting with WebSocket support
- **Database**: MongoDB Atlas or dedicated MongoDB hosting
- **CDN Integration**: Image and asset optimization
- **Load Balancing**: Multiple server instances for high traffic

#### Performance Optimization

**Frontend Optimization:**
- Code splitting with React.lazy()
- Image lazy loading and optimization
- Bundle size monitoring and optimization
- Browser caching strategies

**Backend Optimization:**
- Database connection pooling
- Query optimization and indexing
- Caching layer (Redis for session data)
- Rate limiting and abuse prevention

---

## Development Guidelines

### Code Organization Standards

#### File Naming Conventions
- **Components**: PascalCase (e.g., `RealTimeTheaterSeating.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useRealTimeSeats.ts`)
- **Utilities**: camelCase (e.g., `formatIndianCurrency.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_SEATS_PER_BOOKING`)

#### Component Structure Pattern
```typescript
// 1. Imports (React, third-party, internal)
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';

// 2. Type definitions
interface ComponentProps {
  // prop definitions
}

// 3. Component function
const ComponentName: React.FC<ComponentProps> = ({ ...props }) => {
  // 4. State declarations
  // 5. Effect hooks
  // 6. Event handlers
  // 7. Utility functions
  // 8. JSX return
};

export default ComponentName;
```

#### Error Handling Strategy
- **Component Level**: Error boundaries for feature isolation
- **API Level**: Consistent error response format
- **User Level**: Friendly error messages with actionable guidance
- **Development Level**: Comprehensive logging and debugging

### Testing Approach

#### Testing Priorities
1. **Critical User Journeys**: Booking flow, payment processing
2. **Real-time Features**: WebSocket connections, seat conflicts
3. **Edge Cases**: Network failures, concurrent users
4. **Performance**: High-traffic scenarios, memory usage

#### Testing Tools & Strategies
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: API endpoints and database operations
- **End-to-End Tests**: Complete user workflows
- **Performance Tests**: Load testing for booking scenarios

---

## File References

### Core Configuration Files
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Styling configuration
- `tsconfig.json` - TypeScript configuration

### Data & Configuration
- `src/data/categoriesData.ts` - Category management system
- `src/data/carouselData.ts` - Homepage carousel content
- `src/data/corporateData.ts` - Corporate event data
- `src/styles/color-palettes.css` - Theme color definitions
- `src/styles/corporate-theme.css` - Corporate-specific styles

### Core Components
- `src/pages/Index.tsx` - Homepage layout and structure
- `src/pages/EventListing.tsx` - Event browsing and filtering
- `src/pages/ShowDetails.tsx` - Individual event details and booking initiation
- `src/components/home/CenterFocusedCarousel.tsx` - Featured content carousel
- `src/components/categories/CategoryGrid.jsx` - Category browsing interface

### Booking System
- `src/components/booking/RealTimeTheaterSeating.tsx` - Real-time seat selection
- `src/components/booking/EnhancedTheaterSeating.tsx` - Fallback seat selection
- `src/components/booking/SeatComponent.tsx` - Individual seat component
- `src/hooks/useRealTimeSeats.ts` - Real-time booking logic

### Theme System
- `src/components/ui/corporate-theme-provider.tsx` - Theme context management
- `src/components/ui/palette-provider.tsx` - Advanced palette system
- `src/components/ui/themed-button.tsx` - Theme-aware button component
- `src/components/ui/themed-card.tsx` - Theme-aware card component

### Backend Files
- `server/models/Show.js` - Show and seat management schema
- `server/models/SeatLayout.js` - Seat layout template system
- `server/routes/shows.js` - Show API endpoints
- `server/routes/seatLayouts.js` - Layout management endpoints

### Utility & Hooks
- `src/hooks/useLocation.ts` - Location state management
- `src/hooks/useCarouselControls.ts` - Carousel interaction logic
- `src/lib/utils.ts` - Common utility functions

---

## Getting Started for New Developers

### Prerequisites
1. **Node.js** (v18+) and npm/yarn
2. **MongoDB** instance (local or cloud)
3. **Basic understanding** of React, TypeScript, and modern web development

### Setup Steps
1. **Clone and Install**:
   ```bash
   npm install
   cd server && npm install
   ```

2. **Environment Configuration**:
   - Set up MongoDB connection string
   - Configure any required API keys

3. **Development Servers**:
   ```bash
   # Frontend (Terminal 1)
   npm run dev
   
   # Backend (Terminal 2)
   cd server && npm start
   ```

4. **Key Files to Study First**:
   - Start with `src/pages/Index.tsx` for overall structure
   - Review `src/data/categoriesData.ts` for data patterns
   - Examine `src/hooks/useRealTimeSeats.ts` for complex logic
   - Study `src/components/booking/RealTimeTheaterSeating.tsx` for real-time features

### Learning Path
1. **Basic Navigation**: Understand routing and page structure
2. **Theme System**: Learn dual-theme implementation
3. **Data Flow**: Study how categories and events are managed
4. **Real-time Features**: Dive into WebSocket implementation
5. **Component Patterns**: Review reusable component design
6. **State Management**: Understand context and hook patterns

---

This documentation provides a comprehensive overview of the theater booking platform. For specific implementation details, refer to the individual files mentioned throughout this guide. The codebase follows modern React development practices with a focus on maintainability, scalability, and user experience.

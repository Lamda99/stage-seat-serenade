
export interface Show {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  director?: string;
  image: string;
  category: string;
  language?: string;
  rating?: number;
  reviews?: string;
  isFeatured?: boolean;
  eventType?: 'casual' | 'corporate';
  displayPrice?: string;
  venue: string;
  city: string;
  date: string; // ISO date string
  time?: string;
  seats?: any[]; // Simplified for now
  maxSeatsPerBooking?: number;
}

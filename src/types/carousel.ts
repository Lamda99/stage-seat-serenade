
export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  director: string;
  image: string;
  category: string;
  price: string;
  date: string;
  venue: string;
}

export type SlidePosition = 'center' | 'left' | 'right' | 'hidden';

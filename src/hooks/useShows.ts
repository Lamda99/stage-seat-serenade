
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export interface Show {
  _id: string;
  title: string;
  venue: string;
  date: string;
  seatLayout: any;
  seats: any[];
}

export const useShows = () => {
  return useQuery({
    queryKey: ['shows'],
    queryFn: () => apiClient.get('/shows'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useShow = (id: string) => {
  return useQuery({
    queryKey: ['show', id],
    queryFn: () => apiClient.get(`/shows/${id}`),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
  });
};


import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Show {
  _id: string;
  title: string;
  venue: string;
  date: string;
  seats: any[];
}

interface ShowListProps {
  onEditShow: (show: Show) => void;
}

const ShowList: React.FC<ShowListProps> = ({ onEditShow }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: shows = [], isLoading } = useQuery({
    queryKey: ['admin-shows'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/admin/shows');
      if (!response.ok) throw new Error('Failed to fetch shows');
      return response.json();
    }
  });

  const deleteShowMutation = useMutation({
    mutationFn: async (showId: string) => {
      const response = await fetch(`http://localhost:3001/api/admin/shows/${showId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete show');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shows'] });
      toast({
        title: "Show deleted",
        description: "The show has been successfully removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete show. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleDelete = (showId: string, showTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${showTitle}"? This action cannot be undone.`)) {
      deleteShowMutation.mutate(showId);
    }
  };

  const getShowStatus = (date: string) => {
    const showDate = new Date(date);
    const now = new Date();
    
    if (showDate < now) {
      return <Badge variant="secondary">Past</Badge>;
    } else if (showDate.toDateString() === now.toDateString()) {
      return <Badge variant="default">Today</Badge>;
    } else {
      return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading shows...</div>
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">No shows found</div>
        <p className="text-sm text-gray-400">Create your first show to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Show Details</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shows.map((show: Show) => (
            <TableRow key={show._id}>
              <TableCell>
                <div>
                  <div className="font-medium">{show.title}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{show.venue}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{formatDate(show.date)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{show.seats.length} total seats</div>
                  <div className="text-gray-500">
                    {show.seats.filter(seat => seat.status === 'available').length} available
                  </div>
                </div>
              </TableCell>
              <TableCell>{getShowStatus(show.date)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditShow(show)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(show._id, show.title)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowList;

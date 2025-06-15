
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import SeatLayoutEditor from './SeatLayoutEditor';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied';
  price: number;
}

interface Show {
  _id?: string;
  title: string;
  venue: string;
  date: string;
  seats: Seat[];
}

interface ShowFormProps {
  show?: Show | null;
  onSave: () => void;
  onCancel: () => void;
}

const ShowForm: React.FC<ShowFormProps> = ({ show, onSave, onCancel }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: '',
    venue: '',
    date: '',
    seats: [] as Seat[]
  });

  useEffect(() => {
    if (show) {
      const showDate = new Date(show.date);
      const formattedDate = showDate.toISOString().slice(0, 16);
      
      setFormData({
        title: show.title,
        venue: show.venue,
        date: formattedDate,
        seats: show.seats
      });
    }
  }, [show]);

  const createShowMutation = useMutation({
    mutationFn: async (showData: any) => {
      const url = show 
        ? `http://localhost:3001/api/admin/shows/${show._id}`
        : 'http://localhost:3001/api/admin/shows';
      
      const response = await fetch(url, {
        method: show ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(showData)
      });
      
      if (!response.ok) throw new Error('Failed to save show');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shows'] });
      toast({
        title: show ? "Show updated" : "Show created",
        description: show 
          ? "The show has been successfully updated."
          : "The new show has been successfully created.",
      });
      onSave();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save show. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.venue || !formData.date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.seats.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one seat to the layout.",
        variant: "destructive",
      });
      return;
    }

    createShowMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSeatsUpdate = (seats: Seat[]) => {
    setFormData(prev => ({
      ...prev,
      seats
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            {show ? 'Edit Show' : 'Create New Show'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Show Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter show title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="venue">Venue *</Label>
                <Input
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Enter venue name"
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="date">Date & Time *</Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <SeatLayoutEditor 
        seats={formData.seats}
        onSeatsUpdate={handleSeatsUpdate}
      />

      <div className="flex items-center justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={createShowMutation.isPending}
          className="bg-red-600 hover:bg-red-700"
        >
          {createShowMutation.isPending 
            ? (show ? 'Updating...' : 'Creating...') 
            : (show ? 'Update Show' : 'Create Show')
          }
        </Button>
      </div>
    </div>
  );
};

export default ShowForm;

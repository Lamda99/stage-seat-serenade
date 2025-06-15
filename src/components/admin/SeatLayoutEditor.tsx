
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, RotateCcw } from 'lucide-react';

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'premium' | 'standard' | 'economy';
  status: 'available' | 'occupied';
  price: number;
}

interface SeatLayoutEditorProps {
  seats: Seat[];
  onSeatsUpdate: (seats: Seat[]) => void;
}

const SeatLayoutEditor: React.FC<SeatLayoutEditorProps> = ({ seats, onSeatsUpdate }) => {
  const [newRow, setNewRow] = useState({
    rowLetter: 'A',
    startNumber: 1,
    endNumber: 14,
    type: 'premium' as const,
    price: 500,
    gaps: '5,11' // Default gaps for aisles
  });

  const seatTypeColors = {
    premium: 'bg-green-500',
    standard: 'bg-blue-500',
    economy: 'bg-purple-500'
  };

  const seatTypePrices = {
    premium: 500,
    standard: 400,
    economy: 300
  };

  const addRow = () => {
    const gapNumbers = newRow.gaps
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));

    const newSeats: Seat[] = [];
    
    for (let i = newRow.startNumber; i <= newRow.endNumber; i++) {
      if (!gapNumbers.includes(i)) {
        newSeats.push({
          id: `${newRow.rowLetter}${i}`,
          row: newRow.rowLetter,
          number: i,
          type: newRow.type,
          status: 'available',
          price: newRow.price
        });
      }
    }

    onSeatsUpdate([...seats, ...newSeats]);
  };

  const removeRow = (rowLetter: string) => {
    const filteredSeats = seats.filter(seat => seat.row !== rowLetter);
    onSeatsUpdate(filteredSeats);
  };

  const removeSeat = (seatId: string) => {
    const filteredSeats = seats.filter(seat => seat.id !== seatId);
    onSeatsUpdate(filteredSeats);
  };

  const generateDefaultLayout = () => {
    const defaultSeats: Seat[] = [];
    
    // Premium section (rows A-C)
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const rowLetter = String.fromCharCode(65 + rowIndex);
      for (let seatNum = 1; seatNum <= 14; seatNum++) {
        if (seatNum === 5 || seatNum === 11) continue; // Aisles
        defaultSeats.push({
          id: `${rowLetter}${seatNum}`,
          row: rowLetter,
          number: seatNum,
          type: 'premium',
          status: 'available',
          price: 500
        });
      }
    }

    // Standard section (rows D-H)
    for (let rowIndex = 3; rowIndex < 8; rowIndex++) {
      const rowLetter = String.fromCharCode(65 + rowIndex);
      for (let seatNum = 1; seatNum <= 16; seatNum++) {
        if (seatNum === 5 || seatNum === 13) continue; // Aisles
        defaultSeats.push({
          id: `${rowLetter}${seatNum}`,
          row: rowLetter,
          number: seatNum,
          type: 'standard',
          status: 'available',
          price: 400
        });
      }
    }

    // Economy section (rows I-L)
    for (let rowIndex = 8; rowIndex < 12; rowIndex++) {
      const rowLetter = String.fromCharCode(65 + rowIndex);
      for (let seatNum = 1; seatNum <= 18; seatNum++) {
        if (seatNum === 6 || seatNum === 14) continue; // Aisles
        defaultSeats.push({
          id: `${rowLetter}${seatNum}`,
          row: rowLetter,
          number: seatNum,
          type: 'economy',
          status: 'available',
          price: 300
        });
      }
    }

    onSeatsUpdate(defaultSeats);
  };

  const clearLayout = () => {
    onSeatsUpdate([]);
  };

  const getUniqueRows = () => {
    const rows = [...new Set(seats.map(seat => seat.row))];
    return rows.sort();
  };

  const getSeatsByRow = (rowLetter: string) => {
    return seats
      .filter(seat => seat.row === rowLetter)
      .sort((a, b) => a.number - b.number);
  };

  const getRowStats = (rowLetter: string) => {
    const rowSeats = getSeatsByRow(rowLetter);
    const seatType = rowSeats[0]?.type || 'standard';
    return {
      count: rowSeats.length,
      type: seatType,
      price: rowSeats[0]?.price || 0
    };
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Seat Layout Editor
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={generateDefaultLayout}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Default Layout
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearLayout}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Row Form */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Row</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="rowLetter">Row</Label>
              <Input
                id="rowLetter"
                value={newRow.rowLetter}
                onChange={(e) => setNewRow(prev => ({ ...prev, rowLetter: e.target.value.toUpperCase() }))}
                placeholder="A"
                maxLength={1}
              />
            </div>
            
            <div>
              <Label htmlFor="startNumber">Start</Label>
              <Input
                id="startNumber"
                type="number"
                value={newRow.startNumber}
                onChange={(e) => setNewRow(prev => ({ ...prev, startNumber: parseInt(e.target.value) || 1 }))}
                min={1}
              />
            </div>
            
            <div>
              <Label htmlFor="endNumber">End</Label>
              <Input
                id="endNumber"
                type="number"
                value={newRow.endNumber}
                onChange={(e) => setNewRow(prev => ({ ...prev, endNumber: parseInt(e.target.value) || 1 }))}
                min={1}
              />
            </div>
            
            <div>
              <Label htmlFor="type">Type</Label>
              <Select 
                value={newRow.type} 
                onValueChange={(value: 'premium' | 'standard' | 'economy') => {
                  setNewRow(prev => ({ 
                    ...prev, 
                    type: value,
                    price: seatTypePrices[value]
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={newRow.price}
                onChange={(e) => setNewRow(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                min={0}
              />
            </div>
            
            <div>
              <Label htmlFor="gaps">Gaps</Label>
              <Input
                id="gaps"
                value={newRow.gaps}
                onChange={(e) => setNewRow(prev => ({ ...prev, gaps: e.target.value }))}
                placeholder="5,11"
                title="Comma-separated seat numbers to skip (aisles)"
              />
            </div>
          </div>
          
          <Button 
            onClick={addRow} 
            className="mt-4 bg-red-600 hover:bg-red-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
        </div>

        {/* Layout Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Current Layout</h3>
            <div className="text-sm text-gray-600">
              Total Seats: {seats.length}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Premium (₹500)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Standard (₹400)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Economy (₹300)</span>
            </div>
          </div>

          {seats.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              No seats added yet. Add rows to create your theater layout.
            </div>
          ) : (
            <div className="space-y-2">
              {/* Screen */}
              <div className="text-center mb-6">
                <div className="bg-gray-800 text-white py-2 px-8 rounded-lg inline-block">
                  SCREEN
                </div>
              </div>

              {/* Rows */}
              {getUniqueRows().map(rowLetter => {
                const rowSeats = getSeatsByRow(rowLetter);
                const rowStats = getRowStats(rowLetter);
                
                return (
                  <div key={rowLetter} className="flex items-center space-x-4">
                    <div className="w-8 text-center font-bold">{rowLetter}</div>
                    
                    <div className="flex items-center space-x-1 flex-1">
                      {rowSeats.map(seat => (
                        <div
                          key={seat.id}
                          className={`w-6 h-6 rounded ${seatTypeColors[seat.type]} text-white text-xs flex items-center justify-center cursor-pointer hover:opacity-75`}
                          onClick={() => removeSeat(seat.id)}
                          title={`${seat.id} - Click to remove`}
                        >
                          {seat.number}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {rowStats.count} seats
                      </Badge>
                      <Badge variant="outline">
                        ₹{rowStats.price}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeRow(rowLetter)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatLayoutEditor;

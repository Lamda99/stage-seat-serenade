
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const CastSection = () => {
  const cast = [
    {
      name: 'Amruta Subhash',
      role: 'Actor',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Anita Date',
      role: 'Actor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Seema Deshmukh',
      role: 'Actor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Rajan Bhise',
      role: 'Actor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Jyoti Malshe',
      role: 'Actor',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Kishore Kadam',
      role: 'Actor',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const crew = [
    {
      name: 'Rushikesh Gupte',
      role: 'Director, Writer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Amol Bhagat',
      role: 'Producer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Nitin Bhalchandra',
      role: 'Producer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'A V Prafullachandra',
      role: 'Musician, Background Score',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Milind Jog',
      role: 'Cinematographer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Mahesh Kore',
      role: 'Art Director',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Cast Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-6">Cast</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cast.map((person, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-3">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h4 className="font-semibold text-sm mb-1">{person.name}</h4>
                <p className="text-xs text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crew Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-6">Crew</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {crew.map((person, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-3">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h4 className="font-semibold text-sm mb-1">{person.name}</h4>
                <p className="text-xs text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CastSection;

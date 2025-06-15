
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const categories = [
    {
      id: 'theatre',
      name: 'Theatre',
      description: 'Drama & Stage Shows',
      icon: '🎭',
      color: 'from-purple-500 to-purple-700',
      eventCount: '150+ Events'
    },
    {
      id: 'music',
      name: 'Music',
      description: 'Concerts & Live Shows',
      icon: '🎵',
      color: 'from-blue-500 to-blue-700',
      eventCount: '200+ Events'
    },
    {
      id: 'dance',
      name: 'Dance',
      description: 'Classical & Folk Dance',
      icon: '💃',
      color: 'from-pink-500 to-pink-700',
      eventCount: '80+ Events'
    },
    {
      id: 'comedy',
      name: 'Comedy',
      description: 'Stand-up & Humor',
      icon: '😂',
      color: 'from-yellow-500 to-orange-600',
      eventCount: '60+ Events'
    },
    {
      id: 'drama',
      name: 'Drama',
      description: 'Theatrical Performances',
      icon: '🎪',
      color: 'from-green-500 to-green-700',
      eventCount: '120+ Events'
    },
    {
      id: 'poetry',
      name: 'Poetry',
      description: 'Literature & Recitation',
      icon: '📚',
      color: 'from-indigo-500 to-indigo-700',
      eventCount: '45+ Events'
    },
    {
      id: 'sports',
      name: 'Sports',
      description: 'Live Sports Events',
      icon: '⚽',
      color: 'from-red-500 to-red-700',
      eventCount: '30+ Events'
    },
    {
      id: 'festivals',
      name: 'Festivals',
      description: 'Cultural Celebrations',
      icon: '🎉',
      color: 'from-teal-500 to-teal-700',
      eventCount: '25+ Events'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find events that match your interests and discover new experiences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/events?category=${category.name}`}>
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {category.description}
                  </p>
                  
                  <div className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full inline-block">
                    {category.eventCount}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Trending This Week</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <Link key={`featured-${category.id}`} to={`/events?category=${category.name}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50 to-white border-gray-200">
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full mx-auto mb-6 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                      {category.icon}
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {category.name}
                    </h4>
                    
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    
                    <div className="text-sm font-semibold text-red-600 bg-red-50 px-4 py-2 rounded-full inline-block">
                      {category.eventCount}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

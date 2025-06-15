
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';
import { getCasualCategories, getCorporateCategories, getFeaturedCategories } from '@/data/categoriesData';

const CategoryGrid = () => {
  const { isCorporate } = useCorporateTheme();
  
  // Get categories based on theme
  const categories = isCorporate ? getCorporateCategories() : getCasualCategories();
  const featuredCategories = getFeaturedCategories(isCorporate, 3);

  return (
    <section className={`py-16 px-4 ${isCorporate ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${
            isCorporate ? 'text-slate-800' : 'text-gray-800'
          }`}>
            {isCorporate ? 'Browse Professional Categories' : 'Browse by Categories'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isCorporate ? 'text-slate-600' : 'text-gray-600'
          }`}>
            {isCorporate 
              ? 'Find professional development events that match your career goals'
              : 'Find events that match your interests and discover new experiences'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/events?category=${category.name}`}>
              <Card className={`group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${
                isCorporate 
                  ? 'bg-white border-slate-200 hover:border-blue-200' 
                  : 'bg-white border-gray-200 hover:border-red-200'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110`}>
                    {category.icon}
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    isCorporate 
                      ? 'text-slate-800 group-hover:text-blue-600' 
                      : 'text-gray-800 group-hover:text-red-600'
                  }`}>
                    {category.name}
                  </h3>
                  
                  <p className={`text-sm mb-3 ${
                    isCorporate ? 'text-slate-600' : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                  
                  <div className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${
                    isCorporate 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-red-600 bg-red-50'
                  }`}>
                    {category.eventCount}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h3 className={`text-2xl font-bold mb-8 text-center ${
            isCorporate ? 'text-slate-800' : 'text-gray-800'
          }`}>
            {isCorporate ? 'Popular This Week' : 'Trending This Week'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <Link key={`featured-${category.id}`} to={`/events?category=${category.name}`}>
                <Card className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border ${
                  isCorporate 
                    ? 'bg-gradient-to-br from-slate-50 to-white border-slate-200' 
                    : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full mx-auto mb-6 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                      {category.icon}
                    </div>
                    
                    <h4 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isCorporate 
                        ? 'text-slate-800 group-hover:text-blue-600' 
                        : 'text-gray-800 group-hover:text-red-600'
                    }`}>
                      {category.name}
                    </h4>
                    
                    <p className={`mb-4 ${
                      isCorporate ? 'text-slate-600' : 'text-gray-600'
                    }`}>
                      {category.description}
                    </p>
                    
                    <div className={`text-sm font-semibold px-4 py-2 rounded-full inline-block ${
                      isCorporate 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-red-600 bg-red-50'
                    }`}>
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

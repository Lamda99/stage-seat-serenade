
export interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  eventCount: string;
  isCorporate?: boolean;
}

// Main categories for the platform
export const allCategories: CategoryData[] = [
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
  },
  // Corporate categories
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Executive Development',
    icon: '👔',
    color: 'from-slate-500 to-slate-700',
    eventCount: '40+ Events',
    isCorporate: true
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech Innovation & AI',
    icon: '💻',
    color: 'from-blue-600 to-blue-800',
    eventCount: '65+ Events',
    isCorporate: true
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Investment & Markets',
    icon: '💰',
    color: 'from-green-600 to-green-800',
    eventCount: '50+ Events',
    isCorporate: true
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Digital Marketing & Branding',
    icon: '📈',
    color: 'from-orange-500 to-orange-700',
    eventCount: '35+ Events',
    isCorporate: true
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'Process Optimization',
    icon: '⚙️',
    color: 'from-gray-500 to-gray-700',
    eventCount: '28+ Events',
    isCorporate: true
  },
  {
    id: 'hr',
    name: 'Human Resources',
    description: 'Workforce Management',
    icon: '👥',
    color: 'from-purple-600 to-purple-800',
    eventCount: '22+ Events',
    isCorporate: true
  }
];

// Utility functions to filter categories
export const getCasualCategories = (): CategoryData[] => {
  return allCategories.filter(category => !category.isCorporate);
};

export const getCorporateCategories = (): CategoryData[] => {
  return allCategories.filter(category => category.isCorporate);
};

export const getFeaturedCategories = (isCorporate: boolean = false, count: number = 3): CategoryData[] => {
  const categories = isCorporate ? getCorporateCategories() : getCasualCategories();
  return categories.slice(0, count);
};

export const getCategoryNames = (isCorporate: boolean = false): string[] => {
  const categories = isCorporate ? getCorporateCategories() : getCasualCategories();
  return categories.map(category => category.name);
};

export const getCategoryById = (id: string): CategoryData | undefined => {
  return allCategories.find(category => category.id === id);
};

export const getCategoryByName = (name: string): CategoryData | undefined => {
  return allCategories.find(category => category.name === name);
};

// Total counts for easy reference
export const TOTAL_CATEGORIES = allCategories.length;
export const CASUAL_CATEGORIES_COUNT = getCasualCategories().length;
export const CORPORATE_CATEGORIES_COUNT = getCorporateCategories().length;

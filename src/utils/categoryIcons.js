// Category icons mapping
export const CATEGORY_ICONS = {
  'Food & Dining': '🍽️',
  'Transportation': '🚗',
  'Shopping': '🛒',
  'Entertainment': '🎬',
  'Bills & Utilities': '💡',
  'Healthcare': '🏥',
  'Travel': '✈️',
  'Education': '📚',
  'Business': '💼',
  'Personal Care': '💅',
  'Gifts & Donations': '🎁',
  'Other': '📝'
};

// Function to get icon for a category
export const getCategoryIcon = (category) => {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS['Other'];
};

// Function to get all categories with their icons
export const getCategoriesWithIcons = (categories) => {
  return categories.map(category => ({
    name: category,
    icon: getCategoryIcon(category)
  }));
}; 
# 💰 Expense Tracker

A modern, responsive React application for managing personal expenses with comprehensive categorization and filtering capabilities.

## ✨ Features

### 📊 Dashboard
- **Overview Statistics**: Total expenses, weekly, monthly, and yearly summaries
- **Top Categories**: Quick view of your highest spending categories
- **Multiple Views**: Switch between overview, category breakdown, monthly trends, and weekly analysis
- **Visual Progress Bars**: Category spending visualization with percentages

### ➕ Expense Management
- **Add New Expenses**: Easy-to-use form with validation
- **Edit Expenses**: Update existing expenses with the same intuitive interface
- **Delete Expenses**: Remove expenses with confirmation dialog
- **Custom Categories**: Add new expense categories on the fly
- **Form Validation**: Real-time validation with helpful error messages

### 🔍 Advanced Filtering
- **Time Period Filters**:
  - All Time
  - This Week
  - This Month
  - This Year
  - Custom Date Range
- **Category Filtering**: Filter by specific expense categories
- **Combined Filters**: Use multiple filters simultaneously
- **Active Filter Display**: See which filters are currently applied
- **Quick Filter Removal**: Remove individual filters with one click

### 📋 Expense List
- **Comprehensive View**: See all expenses with detailed information
- **Sorting Options**: Sort by date, amount, title, or category
- **Card Layout**: Clean, modern expense cards with all relevant details
- **Total Calculations**: Real-time totals for filtered expenses
- **Responsive Design**: Works perfectly on all device sizes

### 📱 User Experience
- **Modern UI**: Beautiful, gradient-based design with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Persistent Storage**: Data saved locally in browser storage
- **Fast Performance**: Efficient filtering and sorting algorithms
- **Intuitive Navigation**: Clear tab-based navigation system

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or Download** the project to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd expense-tracker
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser** and visit `http://localhost:3000`

## 📱 How to Use

### Adding Your First Expense
1. Click on the "➕ Add Expense" tab
2. Fill in the expense details:
   - **Title**: Description of the expense (e.g., "Grocery Shopping")
   - **Amount**: The cost (e.g., 45.50)
   - **Category**: Select from predefined categories or add a new one
   - **Date**: When the expense occurred
   - **Description**: Optional additional details
3. Click "Add Expense"

### Managing Categories
- Use the "+" button next to the category dropdown to add new categories
- Categories are automatically saved and available for future expenses
- Default categories include: Food & Dining, Transportation, Shopping, Entertainment, etc.

### Viewing Your Expenses
1. Go to the "📋 View Expenses" tab
2. Use the filter bar to narrow down expenses:
   - Select a time period (week, month, year, or custom range)
   - Choose a specific category
   - Clear filters to see all expenses
3. Sort expenses by clicking the sort buttons (Date, Amount, Title, Category)
4. Edit expenses by clicking the ✏️ button
5. Delete expenses by clicking the 🗑️ button

### Dashboard Analytics
1. Visit the "📊 Dashboard" tab
2. Switch between different views:
   - **Overview**: General statistics and top categories
   - **Categories**: Detailed breakdown by category with percentages
   - **Monthly**: Month-by-month expense analysis
   - **Weekly**: Week-by-week expense trends

## 🎨 Design Features

### Color Scheme
- **Primary Gradient**: Purple to blue gradient (#667eea to #764ba2)
- **Accent Colors**: Various gradients for different stat cards
- **Neutral Colors**: Clean grays and whites for content areas
- **Error States**: Red for validation errors and delete actions

### Typography
- **System Fonts**: Uses system font stack for optimal performance
- **Readable Hierarchy**: Clear font sizes and weights for different content types
- **Accessibility**: High contrast ratios for better readability

### Responsive Breakpoints
- **Desktop**: 1200px+ (full layout with sidebar navigation)
- **Tablet**: 768px-1199px (adapted grid layouts)
- **Mobile**: <768px (stacked layouts and touch-friendly buttons)

## 💾 Data Storage

Your expense data is stored locally in your browser using localStorage. This means:
- ✅ Your data stays private and secure
- ✅ No internet connection required after initial load
- ✅ Data persists between browser sessions
- ⚠️ Data is tied to the specific browser and device
- ⚠️ Clearing browser data will remove your expenses

## 🔧 Technical Stack

- **React 18**: Modern React with hooks and functional components
- **Context API**: State management for expenses and filters
- **Date-fns**: Robust date manipulation and formatting
- **UUID**: Unique identifier generation for expenses
- **CSS3**: Modern styling with flexbox, grid, and animations
- **localStorage**: Client-side data persistence

## 📊 Expense Categories

### Default Categories
- 🍽️ Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Bills & Utilities
- 🏥 Healthcare
- ✈️ Travel
- 📚 Education
- 💼 Business
- 💅 Personal Care
- 🎁 Gifts & Donations
- 📦 Other

You can add custom categories as needed!

## 🚀 Future Enhancements

Potential features for future versions:
- 📈 Charts and graphs for visual analytics
- 📤 Export data to CSV/PDF
- 🔄 Data backup and sync
- 📋 Expense templates for recurring expenses
- 💰 Budget tracking and alerts
- 🏷️ Tags and labels for better organization
- 📱 Progressive Web App (PWA) capabilities

## 🤝 Contributing

This project is perfect for learning React and can be extended with additional features. Feel free to fork and enhance it!

## 📝 License

This project is open source and available under the MIT License.

---

**Happy Expense Tracking! 💰📊**

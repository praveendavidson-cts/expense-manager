import { 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  startOfYear, 
  endOfYear,
  isWithinInterval,
  format,
  parseISO
} from 'date-fns';

// Filter expenses by date range
export function filterExpensesByDateRange(expenses, dateRange, customStartDate = null, customEndDate = null) {
  const now = new Date();
  
  let startDate, endDate;
  
  switch (dateRange) {
    case 'week':
      startDate = startOfWeek(now, { weekStartsOn: 1 }); // Monday start
      endDate = endOfWeek(now, { weekStartsOn: 1 });
      break;
    
    case 'month':
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
      break;
    
    case 'year':
      startDate = startOfYear(now);
      endDate = endOfYear(now);
      break;
    
    case 'custom':
      startDate = customStartDate ? new Date(customStartDate) : null;
      endDate = customEndDate ? new Date(customEndDate) : null;
      break;
    
    default:
      return expenses;
  }
  
  if (!startDate || !endDate) return expenses;
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isWithinInterval(expenseDate, { start: startDate, end: endDate });
  });
}

// Filter expenses by category
export function filterExpensesByCategory(expenses, category) {
  if (!category || category === '') return expenses;
  return expenses.filter(expense => expense.category === category);
}

// Apply all filters
export function applyFilters(expenses, filters) {
  let filteredExpenses = expenses;
  
  // Apply date range filter
  if (filters.dateRange !== 'all') {
    filteredExpenses = filterExpensesByDateRange(
      filteredExpenses, 
      filters.dateRange, 
      filters.startDate, 
      filters.endDate
    );
  }
  
  // Apply category filter
  if (filters.category) {
    filteredExpenses = filterExpensesByCategory(filteredExpenses, filters.category);
  }
  
  return filteredExpenses;
}

// Calculate total amount
export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Group expenses by category
export function groupExpensesByCategory(expenses) {
  return expenses.reduce((groups, expense) => {
    const category = expense.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(expense);
    return groups;
  }, {});
}

// Get category totals
export function getCategoryTotals(expenses) {
  const grouped = groupExpensesByCategory(expenses);
  return Object.keys(grouped).map(category => ({
    category,
    total: calculateTotal(grouped[category]),
    count: grouped[category].length
  })).sort((a, b) => b.total - a.total);
}

// Group expenses by month
export function groupExpensesByMonth(expenses) {
  return expenses.reduce((groups, expense) => {
    const monthKey = format(parseISO(expense.date), 'yyyy-MM');
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(expense);
    return groups;
  }, {});
}

// Get monthly totals
export function getMonthlyTotals(expenses) {
  const grouped = groupExpensesByMonth(expenses);
  return Object.keys(grouped)
    .sort()
    .map(monthKey => ({
      month: format(parseISO(monthKey + '-01'), 'MMM yyyy'),
      monthKey,
      total: calculateTotal(grouped[monthKey]),
      count: grouped[monthKey].length
    }));
}

// Group expenses by week
export function groupExpensesByWeek(expenses) {
  return expenses.reduce((groups, expense) => {
    const expenseDate = parseISO(expense.date);
    const weekStart = startOfWeek(expenseDate, { weekStartsOn: 1 });
    const weekKey = format(weekStart, 'yyyy-MM-dd');
    
    if (!groups[weekKey]) {
      groups[weekKey] = [];
    }
    groups[weekKey].push(expense);
    return groups;
  }, {});
}

// Get weekly totals
export function getWeeklyTotals(expenses) {
  const grouped = groupExpensesByWeek(expenses);
  return Object.keys(grouped)
    .sort()
    .map(weekKey => {
      const weekStart = parseISO(weekKey);
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      return {
        week: `${format(weekStart, 'MMM dd')} - ${format(weekEnd, 'MMM dd, yyyy')}`,
        weekKey,
        total: calculateTotal(grouped[weekKey]),
        count: grouped[weekKey].length
      };
    });
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format date for display
export function formatDate(dateString) {
  return format(parseISO(dateString), 'MMM dd, yyyy');
}

// Get date range label
export function getDateRangeLabel(dateRange) {
  const now = new Date();
  
  switch (dateRange) {
    case 'week':
      const weekStart = startOfWeek(now, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
      return `${format(weekStart, 'MMM dd')} - ${format(weekEnd, 'MMM dd, yyyy')}`;
    
    case 'month':
      return format(now, 'MMMM yyyy');
    
    case 'year':
      return format(now, 'yyyy');
    
    default:
      return 'All Time';
  }
} 
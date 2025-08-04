import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ExpenseContext = createContext();

// Default expense categories
const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Business',
  'Personal Care',
  'Gifts & Donations',
  'Other'
];

// Initial state
const initialState = {
  expenses: [],
  categories: DEFAULT_CATEGORIES,
  filters: {
    category: '',
    dateRange: 'all', // all, week, month, year
    startDate: null,
    endDate: null
  }
};

// Action types
const ACTIONS = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  UPDATE_EXPENSE: 'UPDATE_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  SET_FILTERS: 'SET_FILTERS',
  ADD_CATEGORY: 'ADD_CATEGORY',
  LOAD_DATA: 'LOAD_DATA'
};

// Reducer function
function expenseReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload, id: uuidv4() }]
      };
    
    case ACTIONS.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        )
      };
    
    case ACTIONS.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    
    case ACTIONS.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    
    case ACTIONS.LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
}

// Provider component
export function ExpenseProvider({ children, onSuccess, onError }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('expenseTracker');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: ACTIONS.LOAD_DATA, payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever state changes (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return; // Don't save until we've loaded from localStorage
    
    try {
      localStorage.setItem('expenseTracker', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      if (onError) {
        onError('Failed to save data locally. Changes may not persist.');
      }
    }
  }, [state, onError, isLoaded]);

  // Action creators
  const addExpense = (expense) => {
    try {
      dispatch({
        type: ACTIONS.ADD_EXPENSE,
        payload: {
          ...expense,
          date: new Date(expense.date).toISOString(),
          amount: parseFloat(expense.amount),
          createdAt: new Date().toISOString()
        }
      });
      if (onSuccess) {
        onSuccess('Expense added successfully! 💰');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      if (onError) {
        onError('Failed to add expense. Please try again.');
      }
    }
  };

  const updateExpense = (expense) => {
    try {
      dispatch({
        type: ACTIONS.UPDATE_EXPENSE,
        payload: {
          ...expense,
          date: new Date(expense.date).toISOString(),
          amount: parseFloat(expense.amount),
          updatedAt: new Date().toISOString()
        }
      });
      if (onSuccess) {
        onSuccess('Expense updated successfully! ✏️');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      if (onError) {
        onError('Failed to update expense. Please try again.');
      }
    }
  };

  const deleteExpense = (id) => {
    try {
      dispatch({ type: ACTIONS.DELETE_EXPENSE, payload: id });
      if (onSuccess) {
        onSuccess('Expense deleted successfully! 🗑️');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      if (onError) {
        onError('Failed to delete expense. Please try again.');
      }
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
  };

  const addCategory = (category) => {
    if (!state.categories.includes(category)) {
      dispatch({ type: ACTIONS.ADD_CATEGORY, payload: category });
    }
  };

  const value = {
    ...state,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilters,
    addCategory
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

// Custom hook to use the expense context
export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}

export { ACTIONS }; 
import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { getCategoryIcon } from '../utils/categoryIcons';
import { applyFilters, formatCurrency, formatDate } from '../utils/expenseUtils';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const { expenses, deleteExpense, updateExpense, filters } = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Apply filters to expenses
  const filteredExpenses = applyFilters(expenses, filters);

  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.date);
        bValue = new Date(b.date);
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'category':
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = (expenseData) => {
    updateExpense(expenseData);
    setEditingExpense(null);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  if (editingExpense) {
    return (
      <div className="expense-list">
        <ExpenseForm
          expense={editingExpense}
          onSubmit={handleUpdateExpense}
          onCancel={() => setEditingExpense(null)}
        />
      </div>
    );
  }

  return (
    <div className="expense-list">
      <div className="list-header">
        <h3>Expenses ({sortedExpenses.length})</h3>
        
        {sortedExpenses.length > 0 && (
          <div className="sort-controls">
            <span>Sort by:</span>
            <button
              onClick={() => handleSort('date')}
              className={sortBy === 'date' ? 'active' : ''}
            >
              Date {getSortIcon('date')}
            </button>
            <button
              onClick={() => handleSort('amount')}
              className={sortBy === 'amount' ? 'active' : ''}
            >
              Amount {getSortIcon('amount')}
            </button>
            <button
              onClick={() => handleSort('title')}
              className={sortBy === 'title' ? 'active' : ''}
            >
              Title {getSortIcon('title')}
            </button>
            <button
              onClick={() => handleSort('category')}
              className={sortBy === 'category' ? 'active' : ''}
            >
              Category {getSortIcon('category')}
            </button>
          </div>
        )}
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses found</p>
          <p className="empty-subtitle">
            {filters.dateRange !== 'all' || filters.category
              ? 'Try adjusting your filters'
              : 'Add your first expense to get started'
            }
          </p>
        </div>
      ) : (
        <div className="expenses-grid">
          {sortedExpenses.map(expense => (
            <div key={expense.id} className="expense-card">
              <div className="expense-header">
                <h4 className="expense-title">{expense.title}</h4>
                <span className="expense-amount">
                  {formatCurrency(expense.amount)}
                </span>
              </div>
              
              <div className="expense-details">
                <div className="expense-meta">
                  <span className="expense-category">
                    {getCategoryIcon(expense.category)} {expense.category}
                  </span>
                  <span className="expense-date">
                    {formatDate(expense.date)}
                  </span>
                </div>
                
                {expense.description && (
                  <p className="expense-description">{expense.description}</p>
                )}
              </div>
              
              <div className="expense-actions">
                <button
                  onClick={() => handleEdit(expense)}
                  className="edit-btn"
                  title="Edit expense"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="delete-btn"
                  title="Delete expense"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {sortedExpenses.length > 0 && (
        <div className="list-summary">
          <p>
            Total: <strong>{formatCurrency(
              sortedExpenses.reduce((sum, expense) => sum + expense.amount, 0)
            )}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList; 
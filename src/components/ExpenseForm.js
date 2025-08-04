import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { format } from 'date-fns';

const ExpenseForm = ({ expense = null, onSubmit, onCancel }) => {
  const { categories, addCategory } = useExpenses();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: ''
  });
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title || '',
        amount: expense.amount.toString(),
        category: expense.category || '',
        date: format(new Date(expense.date), 'yyyy-MM-dd'),
        description: expense.description || ''
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: expense?.id
    };
    
    onSubmit(expenseData);
    
    // Reset form if adding new expense
    if (!expense) {
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        description: ''
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setFormData(prev => ({
        ...prev,
        category: newCategory.trim()
      }));
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  return (
    <div className="expense-form">
      <h3>{expense ? 'Edit Expense' : 'Add New Expense'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter expense title"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <div className="category-input">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewCategory(!showNewCategory)}
              className="add-category-btn"
            >
              +
            </button>
          </div>
          {errors.category && <span className="error-message">{errors.category}</span>}
          
          {showNewCategory && (
            <div className="new-category">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <button type="button" onClick={handleAddCategory}>
                Add
              </button>
              <button type="button" onClick={() => setShowNewCategory(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a description (optional)"
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {expense ? 'Update Expense' : 'Add Expense'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm; 
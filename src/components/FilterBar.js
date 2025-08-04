import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { getCategoryIcon } from '../utils/categoryIcons';
import { getDateRangeLabel } from '../utils/expenseUtils';

const FilterBar = () => {
  const { filters, setFilters, categories } = useExpenses();

  const handleDateRangeChange = (dateRange) => {
    setFilters({
      ...filters,
      dateRange,
      startDate: null,
      endDate: null
    });
  };

  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category
    });
  };

  const handleCustomDateChange = (field, value) => {
    setFilters({
      ...filters,
      dateRange: 'custom',
      [field]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      dateRange: 'all',
      startDate: null,
      endDate: null
    });
  };

  const hasActiveFilters = filters.dateRange !== 'all' || filters.category !== '';

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <label>Time Period:</label>
        <div className="filter-buttons">
          <button
            onClick={() => handleDateRangeChange('all')}
            className={filters.dateRange === 'all' ? 'active' : ''}
          >
            All Time
          </button>
          <button
            onClick={() => handleDateRangeChange('week')}
            className={filters.dateRange === 'week' ? 'active' : ''}
          >
            This Week
          </button>
          <button
            onClick={() => handleDateRangeChange('month')}
            className={filters.dateRange === 'month' ? 'active' : ''}
          >
            This Month
          </button>
          <button
            onClick={() => handleDateRangeChange('year')}
            className={filters.dateRange === 'year' ? 'active' : ''}
          >
            This Year
          </button>
          <button
            onClick={() => handleDateRangeChange('custom')}
            className={filters.dateRange === 'custom' ? 'active' : ''}
          >
            Custom Range
          </button>
        </div>
        
        {filters.dateRange !== 'all' && filters.dateRange !== 'custom' && (
          <span className="filter-label">
            Showing: {getDateRangeLabel(filters.dateRange)}
          </span>
        )}
      </div>

      {filters.dateRange === 'custom' && (
        <div className="filter-section custom-date-range">
          <label>Custom Date Range:</label>
          <div className="date-inputs">
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
              placeholder="Start date"
            />
            <span>to</span>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
              placeholder="End date"
            />
          </div>
        </div>
      )}

      <div className="filter-section">
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="category-filter"
        >
                      <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {getCategoryIcon(category)} {category}
              </option>
            ))}
        </select>
      </div>

      {hasActiveFilters && (
        <div className="filter-section">
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        </div>
      )}

      {hasActiveFilters && (
        <div className="active-filters">
          <span>Active filters:</span>
          {filters.dateRange !== 'all' && (
            <span className="filter-tag">
              {filters.dateRange === 'custom' && filters.startDate && filters.endDate
                ? `${filters.startDate} to ${filters.endDate}`
                : getDateRangeLabel(filters.dateRange)
              }
              <button onClick={() => handleDateRangeChange('all')}>×</button>
            </span>
          )}
          {filters.category && (
            <span className="filter-tag">
              {filters.category}
              <button onClick={() => handleCategoryChange('')}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar; 
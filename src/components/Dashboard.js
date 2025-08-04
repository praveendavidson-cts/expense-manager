import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { getCategoryIcon } from '../utils/categoryIcons';
import {
  formatCurrency,
  calculateTotal,
  getCategoryTotals,
  getMonthlyTotals,
  getWeeklyTotals,
  applyFilters
} from '../utils/expenseUtils';

const Dashboard = () => {
  const { expenses } = useExpenses();
  const [viewMode, setViewMode] = useState('overview');

  // Calculate totals for different periods
  const allExpenses = expenses;
  const thisWeekExpenses = applyFilters(expenses, { dateRange: 'week' });
  const thisMonthExpenses = applyFilters(expenses, { dateRange: 'month' });
  const thisYearExpenses = applyFilters(expenses, { dateRange: 'year' });

  const overviewStats = {
    total: calculateTotal(allExpenses),
    thisWeek: calculateTotal(thisWeekExpenses),
    thisMonth: calculateTotal(thisMonthExpenses),
    thisYear: calculateTotal(thisYearExpenses),
    totalCount: allExpenses.length
  };

  const categoryTotals = getCategoryTotals(allExpenses);
  const monthlyTotals = getMonthlyTotals(allExpenses).slice(-12); // Last 12 months
  const weeklyTotals = getWeeklyTotals(allExpenses).slice(-8); // Last 8 weeks

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Expenses</h3>
          <p className="stat-amount">{formatCurrency(overviewStats.total)}</p>
          <span className="stat-count">{overviewStats.totalCount} expenses</span>
        </div>
        
        <div className="stat-card week">
          <h3>This Week</h3>
          <p className="stat-amount">{formatCurrency(overviewStats.thisWeek)}</p>
          <span className="stat-count">{thisWeekExpenses.length} expenses</span>
        </div>
        
        <div className="stat-card month">
          <h3>This Month</h3>
          <p className="stat-amount">{formatCurrency(overviewStats.thisMonth)}</p>
          <span className="stat-count">{thisMonthExpenses.length} expenses</span>
        </div>
        
        <div className="stat-card year">
          <h3>This Year</h3>
          <p className="stat-amount">{formatCurrency(overviewStats.thisYear)}</p>
          <span className="stat-count">{thisYearExpenses.length} expenses</span>
        </div>
      </div>

      {categoryTotals.length > 0 && (
        <div className="top-categories">
          <h3>Top Categories</h3>
          <div className="category-list">
            {categoryTotals.slice(0, 5).map((cat, index) => (
              <div key={cat.category} className="category-item">
                <span className="category-rank">#{index + 1}</span>
                <span className="category-name">{getCategoryIcon(cat.category)} {cat.category}</span>
                <span className="category-amount">{formatCurrency(cat.total)}</span>
                <span className="category-count">({cat.count} expenses)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCategoryView = () => (
    <div className="dashboard-categories">
      <h3>Expenses by Category</h3>
      {categoryTotals.length === 0 ? (
        <p className="empty-message">No expenses to categorize yet</p>
      ) : (
        <div className="category-breakdown">
          {categoryTotals.map((cat, index) => {
            const percentage = overviewStats.total > 0 
              ? ((cat.total / overviewStats.total) * 100).toFixed(1)
              : 0;
            
            return (
              <div key={cat.category} className="category-breakdown-item">
                <div className="category-info">
                  <span className="category-name">{getCategoryIcon(cat.category)} {cat.category}</span>
                  <span className="category-stats">
                    {formatCurrency(cat.total)} ({percentage}%)
                  </span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-bar-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="category-count">{cat.count} expenses</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderMonthlyView = () => (
    <div className="dashboard-monthly">
      <h3>Monthly Expenses</h3>
      {monthlyTotals.length === 0 ? (
        <p className="empty-message">No monthly data available yet</p>
      ) : (
        <div className="monthly-breakdown">
          {monthlyTotals.map((month) => (
            <div key={month.monthKey} className="monthly-item">
              <div className="month-info">
                <span className="month-name">{month.month}</span>
                <span className="month-amount">{formatCurrency(month.total)}</span>
              </div>
              <div className="month-details">
                <span className="month-count">{month.count} expenses</span>
                {month.count > 0 && (
                  <span className="month-average">
                    Avg: {formatCurrency(month.total / month.count)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWeeklyView = () => (
    <div className="dashboard-weekly">
      <h3>Weekly Expenses</h3>
      {weeklyTotals.length === 0 ? (
        <p className="empty-message">No weekly data available yet</p>
      ) : (
        <div className="weekly-breakdown">
          {weeklyTotals.map((week) => (
            <div key={week.weekKey} className="weekly-item">
              <div className="week-info">
                <span className="week-name">{week.week}</span>
                <span className="week-amount">{formatCurrency(week.total)}</span>
              </div>
              <div className="week-details">
                <span className="week-count">{week.count} expenses</span>
                {week.count > 0 && (
                  <span className="week-average">
                    Avg: {formatCurrency(week.total / week.count)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (viewMode) {
      case 'categories':
        return renderCategoryView();
      case 'monthly':
        return renderMonthlyView();
      case 'weekly':
        return renderWeeklyView();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="dashboard-nav">
          <button
            onClick={() => setViewMode('overview')}
            className={viewMode === 'overview' ? 'active' : ''}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('categories')}
            className={viewMode === 'categories' ? 'active' : ''}
          >
            Categories
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={viewMode === 'monthly' ? 'active' : ''}
          >
            Monthly
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={viewMode === 'weekly' ? 'active' : ''}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 
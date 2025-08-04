import React, { useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import { useExpenses } from './context/ExpenseContext';
import './App.css';

// Main content component that uses the expense context
function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { addExpense } = useExpenses();

  const handleAddExpense = (expenseData) => {
    addExpense(expenseData);
    // Optionally switch to expenses list after adding
    // setActiveTab('expenses');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'add':
        return <ExpenseForm onSubmit={handleAddExpense} />;
      case 'expenses':
        return (
          <div className="expenses-page">
            <FilterBar />
            <ExpenseList />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">💰 Expense Tracker</h1>
          <nav className="main-nav">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'active' : ''}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={activeTab === 'add' ? 'active' : ''}
            >
              ➕ Add Expense
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={activeTab === 'expenses' ? 'active' : ''}
            >
              📋 View Expenses
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {renderContent()}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Expense Tracker. Track your expenses with ease!</p>
      </footer>
    </div>
  );
}

// Main App component with provider
function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import Modal from './components/Modal';

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  
  const API_URL = 'https://goal-planner-json-backend.onrender.com/goals';


  // Fetch all goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }
        
        const data = await response.json();
        setGoals(data);
        setError(null);
      } catch (err) {
        setError('Error fetching goals. Please make sure json-server is running.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGoals();
  }, []);

  // Add a new goal
  const handleAddGoal = async (newGoal) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add goal');
      }
      
      const addedGoal = await response.json();
      setGoals([...goals, addedGoal]);
    } catch (err) {
      setError('Error adding goal');
      console.error(err);
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete goal');
        }
        
        setGoals(goals.filter(goal => goal.id !== id));
      } catch (err) {
        setError('Error deleting goal');
        console.error(err);
      }
    }
  };

  // Open deposit modal
  const handleOpenDepositModal = (goalId) => {
    setSelectedGoalId(goalId);
    setIsDepositModalOpen(true);
  };

  // Make a deposit
  const handleDeposit = async (goalId, amount) => {
    try {
      // Find the goal to update
      const goalToUpdate = goals.find(goal => goal.id === goalId);
      
      if (!goalToUpdate) {
        throw new Error('Goal not found');
      }
      
      // Calculate new saved amount
      const newSavedAmount = goalToUpdate.savedAmount + amount;
      
      // Update the goal
      const response = await fetch(`${API_URL}/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savedAmount: newSavedAmount
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update goal');
      }
      
      const updatedGoal = await response.json();
      
      // Update state
      setGoals(goals.map(goal => 
        goal.id === goalId ? updatedGoal : goal
      ));
      
      // Close modal
      setIsDepositModalOpen(false);
    } catch (err) {
      setError('Error making deposit');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Goal Planner</h1>
      </header>
      
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        <Overview goals={goals} />
        
        <div className="app-container">
          <div className="form-section">
            <GoalForm onAddGoal={handleAddGoal} />
          </div>
          
          <div className="goals-section">
            <h2>Your Goals</h2>
            {isLoading ? (
              <p>Loading goals...</p>
            ) : (
              <GoalList 
                goals={goals} 
                onDelete={handleDeleteGoal} 
                onDeposit={handleOpenDepositModal} 
              />
            )}
          </div>
        </div>
        
        <Modal 
          isOpen={isDepositModalOpen} 
          onClose={() => setIsDepositModalOpen(false)}
        >
          <DepositForm 
            goals={goals.filter(goal => !selectedGoalId || goal.id === selectedGoalId)} 
            onDeposit={handleDeposit}
            onClose={() => setIsDepositModalOpen(false)}
          />
        </Modal>
      </main>
    </div>
  );
}

export default App;
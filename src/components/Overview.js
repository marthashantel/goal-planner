import React from 'react';

const Overview = ({ goals }) => {
  // Calculate total goals
  const totalGoals = goals.length;
  
  // Calculate total saved amount
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  
  // Calculate completed goals
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  // Calculate goals with approaching deadlines (within 30 days)
  const today = new Date();
  const warningGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
  }).length;
  
  // Calculate overdue goals
  const overdueGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    return deadlineDate < today && goal.savedAmount < goal.targetAmount;
  }).length;

  return (
    <div className="overview-container">
      <h2>Goals Overview</h2>
      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p className="stat-value">{totalGoals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p className="stat-value">${totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="stat-card">
          <h3>Completed Goals</h3>
          <p className="stat-value">{completedGoals}</p>
        </div>
        
        <div className="stat-card warning">
          <h3>Approaching Deadline</h3>
          <p className="stat-value">{warningGoals}</p>
        </div>
        
        <div className="stat-card overdue">
          <h3>Overdue Goals</h3>
          <p className="stat-value">{overdueGoals}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
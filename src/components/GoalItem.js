import React from 'react';

const GoalItem = ({ goal, onDelete, onDeposit }) => {
  const { id, name, targetAmount, savedAmount, category, deadline } = goal;
  
  // Calculate progress percentage
  const progress = Math.min(Math.round((savedAmount / targetAmount) * 100), 100);
  
  // Calculate remaining amount
  const remainingAmount = targetAmount - savedAmount;
  
  // Calculate days left
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  
  // Determine status
  let status = "On Track";
  let statusClass = "status-on-track";
  
  if (savedAmount >= targetAmount) {
    status = "Completed";
    statusClass = "status-completed";
  } else if (daysLeft < 0) {
    status = "Overdue";
    statusClass = "status-overdue";
  } else if (daysLeft <= 30) {
    status = "Warning";
    statusClass = "status-warning";
  }

  return (
    <div className="goal-item">
      <div className="goal-header">
        <h3>{name}</h3>
        <span className={`goal-status ${statusClass}`}>{status}</span>
      </div>
      
      <div className="goal-details">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Target:</strong> ${targetAmount.toLocaleString()}</p>
        <p><strong>Saved:</strong> ${savedAmount.toLocaleString()}</p>
        <p><strong>Remaining:</strong> ${remainingAmount.toLocaleString()}</p>
        <p>
          <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
          {daysLeft > 0 ? ` (${daysLeft} days left)` : " (Passed)"}
        </p>
      </div>
      
      <div className="goal-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{progress}%</span>
      </div>
      
      <div className="goal-actions">
        <button 
          className="deposit-btn" 
          onClick={() => onDeposit(id)}
        >
          Make Deposit
        </button>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GoalItem;
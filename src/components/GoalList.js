import React from 'react';
import GoalItem from './GoalItem';

const GoalList = ({ goals, onDelete, onDeposit }) => {
  if (!goals || goals.length === 0) {
    return <p className="no-goals">No goals found. Add a new goal to get started!</p>;
  }

  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalItem 
          key={goal.id} 
          goal={goal} 
          onDelete={onDelete} 
          onDeposit={onDeposit} 
        />
      ))}
    </div>
  );
};

export default GoalList;
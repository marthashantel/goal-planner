import React, { useState } from 'react';

const DepositForm = ({ goals, onDeposit, onClose }) => {
  const [formData, setFormData] = useState({
    goalId: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.goalId || !formData.amount || formData.amount <= 0) {
      alert('Please select a goal and enter a valid amount');
      return;
    }

    // Call parent function to make deposit
    onDeposit(formData.goalId, formData.amount);

    // Reset form
    setFormData({
      goalId: '',
      amount: ''
    });
    
    // Close modal if provided
    if (onClose) onClose();
  };

  return (
    <div className="deposit-form-container">
      <h2>Make a Deposit</h2>
      <form className="deposit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="goalId">Select Goal</label>
          <select
            id="goalId"
            name="goalId"
            value={formData.goalId}
            onChange={handleChange}
            required
          >
            <option value="">Choose a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            placeholder="e.g., 100"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Make Deposit</button>
          {onClose && (
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DepositForm;
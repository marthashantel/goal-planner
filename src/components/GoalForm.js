import React, { useState } from 'react';

const GoalForm = ({ onAddGoal }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'targetAmount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.targetAmount || !formData.category || !formData.deadline) {
      alert('Please fill in all fields');
      return;
    }

    // Create new goal object
    const newGoal = {
      ...formData,
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Call parent function to add goal
    onAddGoal(newGoal);

    // Reset form
    setFormData({
      name: '',
      targetAmount: '',
      category: '',
      deadline: ''
    });
  };

  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      <form className="goal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Goal Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Travel Fund"
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount ($)</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="1"
            step="0.01"
            placeholder="e.g., 5000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Home">Home</option>
            <option value="Retirement">Retirement</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <button type="submit" className="submit-btn">Add Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;
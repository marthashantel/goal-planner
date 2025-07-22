# Smart Goal Planner

A React application for managing multiple savings goals, allocating deposits across them, and tracking progress toward each goal.

## Features

- Add new financial goals (e.g., "Travel Fund", "Emergency Fund")
- Track progress for each goal
- Make deposits to any goal
- See a full overview of all savings activity
- Data persistence using json-server

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the json-server (in one terminal):
   ```
   npm run server
   ```
   This will serve the db.json file at http://localhost:3001/goals

2. Start the React application (in another terminal):
   ```
   npm start
   ```
   This will start the application at http://localhost:3000

## Usage

- **Add a New Goal**: Fill out the form on the left side of the screen with goal details and click "Add Goal"
- **Make a Deposit**: Click the "Make Deposit" button on any goal card, enter the amount, and submit
- **Delete a Goal**: Click the "Delete" button on any goal card
- **View Progress**: Each goal card shows a progress bar and percentage of completion
- **Overview**: The top section shows summary statistics of all your goals

## Data Structure

Each goal has the following properties:
- id: Unique identifier
- name: Name of the goal
- targetAmount: Target amount to save
- savedAmount: Current amount saved
- category: Category of the goal
- deadline: Target date to complete the goal
- createdAt: Date when the goal was created
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css'

const App = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const triggerRefresh = () => {
    setRefreshTasks(prev => !prev); // toggle to trigger re-fetch
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const clearEditing = () => {
    setEditingTask(null);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm
        onTaskAdded={triggerRefresh}
        onUpdateTask={triggerRefresh}
        editingTask={editingTask}
        clearEditing={clearEditing}
      />
      <TaskList
        onEdit={handleEdit}
        refreshTrigger={refreshTasks}
      />
    </div>
  );
};

export default App;

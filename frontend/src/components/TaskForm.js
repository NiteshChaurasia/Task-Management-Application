import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const API_BASE = 'https://task-management-application-yurc.onrender.com';

const TaskForm = ({ onTaskAdded, editingTask, onUpdateTask, clearEditing }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingTask) {
      await fetch(`${API_BASE}/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      onUpdateTask();
    } else {
      await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      onTaskAdded();
    }

    setName('');
    setDescription('');
    if (clearEditing) clearEditing();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="task-row">
        <input
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
      </div>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
};

export default TaskForm;

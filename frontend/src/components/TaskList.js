import React, { useEffect, useState } from 'react';
import './TaskList.css';

const API_BASE = 'https://task-management-application-yurc.onrender.com'; 

const TaskList = ({ onEdit, refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
      });
      fetchTasks(); // Reload tasks after deletion
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]); // Refresh when the trigger changes

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div className="task-details">
            <strong>{task.name}</strong>
            <span>{task.description}</span>
          </div>
          <div className="task-actions">
            <button className="editTask" onClick={() => onEdit(task)}>Edit</button>
            <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

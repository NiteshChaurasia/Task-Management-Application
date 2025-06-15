const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let idCounter = 1;

// Root route
app.get('/', (req, res) => {
  res.send('Task Management Backend is running.');
});

// Create task
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  const newTask = { id: idCounter++, name, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Update task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { name, description } = req.body;
  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.name = name || task.name;
  task.description = description || task.description;
  res.json(task);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import React, { useState, useEffect } from 'react';

const TaskForm = ({ onTaskAdded, taskToEdit, onTaskUpdated, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      // Format date for input[type="date"] (YYYY-MM-DD)
      if (taskToEdit.dueDate) {
        setDueDate(new Date(taskToEdit.dueDate).toISOString().split('T')[0]);
      } else {
        setDueDate('');
      }
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      priority,
      dueDate: dueDate || null,
      status: taskToEdit ? taskToEdit.status : 'pending'
    };

    if (taskToEdit) {
      onTaskUpdated(taskToEdit._id, taskData);
    } else {
      onTaskAdded(taskData);
    }

    if (!taskToEdit) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <div className="task-form-container glass-card">
      <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input 
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="2"
          className="form-description"
        />
        <div className="form-actions" style={{ gridColumn: 'span 3', display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </button>
          {taskToEdit && (
            <button type="button" onClick={onCancelEdit} className="btn-danger" style={{ flex: 1 }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

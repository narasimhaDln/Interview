import React from 'react';

const TaskItem = ({ task, onUpdate, onDelete, onEdit }) => {
  const handleToggleStatus = () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    onUpdate(task._id, { status: newStatus });
  };

  return (
    <div className="task-item glass-card">
      <div className="task-content">
        <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
          {task.title}
        </h3>
        <p className="task-description">{task.description}</p>
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
          <span>Status: {task.status}</span>
          {task.dueDate && (
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="btn-secondary" style={{ marginRight: '5px' }}>
          Edit
        </button>
        <button onClick={handleToggleStatus} className="btn-primary">
          {task.status === 'completed' ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onDelete(task._id)} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

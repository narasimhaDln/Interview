import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete, onEdit, loading }) => {
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return <div className="loading">No tasks found. Start by adding one above!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;

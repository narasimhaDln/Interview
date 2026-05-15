import { useState, useEffect } from "react";
import "./index.css";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      if (newTask) {
        setTasks((prev) => [newTask, ...prev]);
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      if (updatedTask) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? { ...t, ...updatedTask } : t))
        );
        setTaskToEdit(null); // Clear edit mode after successful update
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter((t) => t._id !== id));
        if (taskToEdit?._id === id) setTaskToEdit(null);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskForm 
        onTaskAdded={handleAddTask} 
        taskToEdit={taskToEdit}
        onTaskUpdated={handleUpdateTask}
        onCancelEdit={() => setTaskToEdit(null)}
      />
      <h2>Your Tasks</h2>
      <TaskList
        tasks={tasks}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        loading={loading}
      />
    </div>
  );
}

export default App;

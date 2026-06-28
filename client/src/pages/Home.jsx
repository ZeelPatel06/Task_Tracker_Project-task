import React, { useState, useEffect, useRef } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import apiService from '../services/api';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Custom Toast state
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  // Trigger custom toast notification
  const triggerToast = (message, type = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Close toast manually
  const closeToast = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast(null);
  };

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTasks();
      setTasks(response.data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to load tasks from server.';
      triggerToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Handle task submission (create or update)
  const handleSubmitTask = async (taskData) => {
    try {
      if (currentTask) {
        // Update mode
        const response = await apiService.updateTask(currentTask._id, taskData);
        // Instant state update: map tasks and replace the updated one
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === currentTask._id ? response.data : t))
        );
        triggerToast('Task updated successfully!', 'success');
        setCurrentTask(null);
      } else {
        // Add mode
        const response = await apiService.createTask(taskData);
        // Instant state update: insert new task at the top
        setTasks((prevTasks) => [response.data, ...prevTasks]);
        triggerToast('Task created successfully!', 'success');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to save task.';
      triggerToast(errorMsg, 'error');
    }
  };

  // Handle task edit selection
  const handleEditSelect = (task) => {
    setCurrentTask(task);
    // Scroll form into view for mobile users
    document.getElementById('form-heading')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setCurrentTask(null);
  };

  // Handle task delete
  const handleDeleteTask = async (id) => {
    try {
      await apiService.deleteTask(id);
      // Instant state update: filter out deleted task
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
      triggerToast('Task deleted successfully!', 'warning');
      
      // If the task currently being edited is deleted, cancel edit mode
      if (currentTask && currentTask._id === id) {
        setCurrentTask(null);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to delete task.';
      triggerToast(errorMsg, 'error');
    }
  };

  // Client-side filtering & search
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toast && (
        <div className="toast-container" role="alert">
          <div className={`toast ${toast.type}`}>
            <span>{toast.message}</span>
            <button className="toast-close" onClick={closeToast} aria-label="Close notification">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Header */}
      <header className="app-header">
        <h1 className="app-title">Task Tracker</h1>
        <p className="app-subtitle">Organize and monitor your daily tasks efficiently</p>
      </header>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Form */}
        <aside className="form-column">
          <TaskForm
            onSubmit={handleSubmitTask}
            currentTask={currentTask}
            onCancelEdit={handleCancelEdit}
          />
        </aside>

        {/* Right Column: List & Filters */}
        <main className="tasks-column">
          {/* Search and Filters Section */}
          <section className="controls-panel">
            {/* Search Box */}
            <div className="search-box">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search tasks by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search tasks by title"
              />
            </div>

            {/* Filter Toggle Tabs */}
            <div className="filter-group" role="tablist" aria-label="Filter tasks">
              {['All', 'Pending', 'Completed'].map((status) => (
                <button
                  key={status}
                  role="tab"
                  aria-selected={filterStatus === status}
                  className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </section>

          {/* Task List Section */}
          <section>
            {loading ? (
              <div className="spinner-container" aria-label="Loading tasks">
                <div className="spinner"></div>
              </div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEditSelect}
                onDelete={handleDeleteTask}
                filterActive={filterStatus !== 'All'}
                searchActive={searchTerm !== ''}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

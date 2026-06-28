import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, currentTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState({});

  const isEditing = !!currentTask;

  // Populate form if currentTask changes (i.e. we start editing)
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title || '');
      setDescription(currentTask.description || '');
      setStatus(currentTask.status || 'Pending');
      setErrors({});
    } else {
      // Clear form when exiting edit mode
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setErrors({});
    }
  }, [currentTask]);

  // Handle client-side validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status
    });

    // Reset fields if adding new task
    if (!isEditing) {
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setErrors({});
    }
  };

  return (
    <div className="card-wrapper">
      <h2 className="card-title-section" id="form-heading">
        {isEditing ? 'Edit Task' : 'Add Task'}
      </h2>
      <form onSubmit={handleSubmit} aria-labelledby="form-heading">
        {/* Title Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="task-title">Title *</label>
          <input
            id="task-title"
            type="text"
            className={`form-input ${errors.title ? 'is-invalid' : ''}`}
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            maxLength={105} // Allow slightly more than 100 so user hits limit and trigger validation
          />
          <div className="char-counter">
            {title.length}/100
          </div>
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="task-description">Description *</label>
          <textarea
            id="task-description"
            className={`form-input form-textarea ${errors.description ? 'is-invalid' : ''}`}
            placeholder="Add some details about the task..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({ ...errors, description: '' });
            }}
            maxLength={505}
          />
          <div className="char-counter">
            {description.length}/500
          </div>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        {/* Status Dropdown */}
        <div className="form-group">
          <label className="form-label" htmlFor="task-status">Status</label>
          <select
            id="task-status"
            className="form-input form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit Actions */}
        <div className={isEditing ? 'form-actions' : ''}>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

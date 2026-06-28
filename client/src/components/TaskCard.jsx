import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { _id, title, description, status, createdAt, updatedAt } = task;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEditClick = () => {
    onEdit(task);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(_id);
    }
  };

  return (
    <article className={`task-card ${status}`} data-testid={`task-card-${_id}`}>
      <div>
        <header className="task-card-header">
          <h3 className="task-card-title">{title}</h3>
          <span 
            className={`badge ${status === 'Completed' ? 'badge-completed' : 'badge-pending'}`}
          >
            {status}
          </span>
        </header>
        <p className="task-card-description">{description}</p>
      </div>

      <footer className="task-card-footer">
        <span className="task-date" title={`Last updated: ${formatDate(updatedAt)}`}>
          Created: {formatDate(createdAt)}
        </span>
        <div className="task-actions">
          <button 
            className="btn btn-edit"
            onClick={handleEditClick}
            aria-label={`Edit task ${title}`}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleDeleteClick}
            aria-label={`Delete task ${title}`}
          >
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
};

export default TaskCard;

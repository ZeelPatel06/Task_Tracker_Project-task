import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete, filterActive, searchActive }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <h3 className="empty-state-title">
          {searchActive || filterActive ? 'No matching tasks' : 'No tasks yet'}
        </h3>
        <p className="empty-state-desc">
          {searchActive || filterActive
            ? 'Try adjusting your search query or filter options to find what you are looking for.'
            : 'Get started by creating your first task using the form on the left!'}
        </p>
      </div>
    );
  }

  return (
    <div className="tasks-list-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;

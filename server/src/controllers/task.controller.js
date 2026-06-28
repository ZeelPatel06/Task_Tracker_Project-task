import Task from "../models/task.model.js";

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching tasks', error: error.message });
  }
};

// @desc    Get a single task
// @route   GET /api/tasks/:id
// @access  Public
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    res.status(500).json({ message: 'Server error while fetching task', error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Backend manual validation validation response
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (title.length > 100) {
      return res.status(400).json({ message: 'Title cannot exceed 100 characters' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (description.length > 500) {
      return res.status(400).json({ message: 'Description cannot exceed 500 characters' });
    }
    if (status && !['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Pending or Completed' });
    }

    const task = new Task({
      title: title.trim(),
      description: description.trim(),
      status: status || 'Pending'
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error while creating task', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validate inputs if provided
    if (title !== undefined) {
      if (!title || !title.trim()) {
        return res.status(400).json({ message: 'Title is required' });
      }
      if (title.length > 100) {
        return res.status(400).json({ message: 'Title cannot exceed 100 characters' });
      }
    }

    if (description !== undefined) {
      if (!description || !description.trim()) {
        return res.status(400).json({ message: 'Description is required' });
      }
      if (description.length > 500) {
        return res.status(400).json({ message: 'Description cannot exceed 500 characters' });
      }
    }

    if (status !== undefined && !['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Pending or Completed' });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error while updating task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    res.status(500).json({ message: 'Server error while deleting task', error: error.message });
  }
};

import Task from '../models/Task.js';
import Project from '../models/Project.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    if (!title || !projectId || !assignedTo) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (
      project.createdBy.toString() !== req.user.id &&
      req.user.role !== 'Admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to create tasks in this project' });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      dueDate,
    });

    const populatedTask = await task
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === 'Admin') {
      tasks = await Task.find()
        .populate('assignedTo', 'name email')
        .populate('projectId', 'name');
    } else {
      tasks = await Task.find({ assignedTo: req.user.id })
        .populate('assignedTo', 'name email')
        .populate('projectId', 'name');
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.projectId);

    if (
      req.user.role === 'Member' &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: 'Members can only update their assigned tasks',
      });
    }

    if (
      req.user.role !== 'Admin' &&
      project.createdBy.toString() !== req.user.id &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name');

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.projectId);

    if (
      project.createdBy.toString() !== req.user.id &&
      req.user.role !== 'Admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === 'Admin') {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedTo: req.user.id });
    }

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Done').length;
    const pending = tasks.filter((t) => t.status !== 'Done').length;
    const overdue = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Done'
    ).length;

    res.status(200).json({
      total,
      completed,
      pending,
      overdue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

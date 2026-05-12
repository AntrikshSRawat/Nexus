import React, { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getProjects,
} from '../services/api';
import { formatDate, isOverdue } from '../utils/helpers';

const statusConfig = {
  'Todo': { label: 'Todo', dotClass: 'bg-surface-400', pillClass: 'bg-surface-700 text-surface-300' },
  'In Progress': { label: 'In Progress', dotClass: 'bg-amber-400', pillClass: 'bg-amber-500/10 text-amber-400' },
  'Done': { label: 'Done', dotClass: 'bg-emerald-400', pillClass: 'bg-emerald-500/10 text-emerald-400' },
};

const Tasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: user?.id || '',
    status: 'Todo',
    dueDate: '',
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        await updateTask(editingId, formData);
      } else if (user?.role === 'Admin') {
        await createTask(formData);
      } else {
        setError('Only admins can create tasks');
        setSubmitting(false);
        return;
      }

      resetForm();
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setFormData({
      title: task.title,
      description: task.description,
      projectId: task.projectId._id,
      assignedTo: task.assignedTo._id,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      projectId: '',
      assignedTo: user?.id || '',
      status: 'Todo',
      dueDate: '',
    });
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg border border-surface-600 bg-surface-900 text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500/40";

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-surface-50">Tasks</h1>
          <p className="text-surface-500 text-sm mt-1">Kanban board view</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-surface-700 bg-surface-800 text-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/40"
          >
            <option value="">All statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          {user?.role === 'Admin' && (
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New task
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Task modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-800 border border-surface-700 rounded-xl max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-surface-50 mb-5">
              {editingId ? 'Edit task' : 'Create task'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-surface-300 text-sm font-medium mb-1.5">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Task title"
                />
              </div>
              <div>
                <label className="block text-surface-300 text-sm font-medium mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  rows="2"
                  placeholder="Brief description"
                ></textarea>
              </div>
              {user?.role === 'Admin' && (
                <>
                  <div>
                    <label className="block text-surface-300 text-sm font-medium mb-1.5">Project</label>
                    <select
                      name="projectId"
                      value={formData.projectId}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select project</option>
                      {projects.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-surface-300 text-sm font-medium mb-1.5">Assigned To</label>
                    <input
                      type="text"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="User ID"
                    />
                  </div>
                  <div>
                    <label className="block text-surface-300 text-sm font-medium mb-1.5">Due date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-surface-300 text-sm font-medium mb-1.5">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-accent-600 hover:bg-accent-500 text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-surface-700 hover:bg-surface-600 text-surface-300 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Kanban board */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-surface-700 border-t-accent-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Todo', 'In Progress', 'Done'].map((status) => {
            const columnTasks = (filterStatus ? tasks.filter(t => t.status === filterStatus) : tasks).filter(t => t.status === status);
            const config = statusConfig[status];

            return (
              <div key={status} className="bg-surface-800/30 border border-surface-700/50 rounded-xl">
                {/* Column header */}
                <div className="px-4 py-3 border-b border-surface-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${config.dotClass}`} />
                    <span className="text-sm font-medium text-surface-300">{config.label}</span>
                  </div>
                  <span className="text-xs text-surface-500 bg-surface-700/50 px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="p-3 space-y-2.5 min-h-[200px]">
                  {columnTasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-surface-800 border border-surface-700/50 rounded-lg p-3.5 hover:border-surface-600 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-surface-200 group-hover:text-surface-50 transition-colors leading-snug">
                          {task.title}
                        </h4>
                        <div className="flex gap-1 ml-2 shrink-0">
                          {user?.role === 'Admin' && (
                            <>
                              <button
                                onClick={() => handleEdit(task)}
                                className="text-surface-600 hover:text-accent-400 transition-colors p-0.5"
                                title="Edit"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(task._id)}
                                className="text-surface-600 hover:text-red-400 transition-colors p-0.5"
                                title="Delete"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </button>
                            </>
                          )}
                          {user?.role === 'Member' && task.assignedTo._id === user.id && (
                            <button
                              onClick={() => handleEdit(task)}
                              className="text-surface-600 hover:text-accent-400 transition-colors p-0.5"
                              title="Update status"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>

                      {task.description && (
                        <p className="text-xs text-surface-500 mb-3 line-clamp-2 leading-relaxed">{task.description}</p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-surface-500 mb-2">
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        <span className="truncate">{task.projectId?.name}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-surface-500">
                          <div className="w-4 h-4 rounded-full bg-surface-700 flex items-center justify-center text-[10px] text-surface-400 font-medium">
                            {task.assignedTo?.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <span className="truncate max-w-[80px]">{task.assignedTo?.name}</span>
                        </div>

                        {task.dueDate && (
                          <span className={`text-xs ${isOverdue(task.dueDate, task.status) ? 'text-red-400 font-medium' : 'text-surface-500'}`}>
                            {isOverdue(task.dueDate, task.status) && (
                              <svg className="w-3 h-3 inline mr-0.5 -mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                              </svg>
                            )}
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="text-center py-8 text-surface-600 text-xs">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tasks;

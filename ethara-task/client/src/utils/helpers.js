export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const isOverdue = (dueDate, status) => {
  return status !== 'Done' && new Date(dueDate) < new Date();
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Todo':
      return 'bg-surface-700 text-surface-300';
    case 'In Progress':
      return 'bg-amber-500/10 text-amber-400';
    case 'Done':
      return 'bg-emerald-500/10 text-emerald-400';
    default:
      return 'bg-surface-700 text-surface-300';
  }
};

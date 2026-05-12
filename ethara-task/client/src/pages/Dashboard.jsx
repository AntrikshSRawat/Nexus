import React, { useEffect, useState } from 'react';
import { getTaskStats } from '../services/api';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getTaskStats();
      setStats(res.data);
    } catch (err) {
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-surface-50">Dashboard</h1>
        <p className="text-surface-500 text-sm mt-1">Overview of your task performance</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-surface-700 border-t-accent-500"></div>
        </div>
      ) : (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Tasks" value={stats.total} color="accent" />
            <StatCard label="Completed" value={stats.completed} color="emerald" />
            <StatCard label="In Progress" value={stats.pending} color="amber" />
            <StatCard label="Overdue" value={stats.overdue} color="red" />
          </div>

          {/* Analytics section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Completion rate */}
            <div className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-6">
              <h2 className="text-sm font-medium text-surface-400 mb-4">Completion Rate</h2>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl font-bold text-surface-50">{completionRate}%</span>
                <span className="text-sm text-surface-500 pb-1">of tasks done</span>
              </div>
              <div className="w-full h-2 bg-surface-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-500 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-surface-500">
                <span>{stats.completed} completed</span>
                <span>{stats.total} total</span>
              </div>
            </div>

            {/* Task breakdown */}
            <div className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-6">
              <h2 className="text-sm font-medium text-surface-400 mb-4">Task Breakdown</h2>
              <div className="space-y-4">
                <BreakdownRow
                  label="Completed"
                  value={stats.completed}
                  total={stats.total}
                  colorClass="bg-emerald-500"
                />
                <BreakdownRow
                  label="In Progress"
                  value={stats.pending - stats.overdue}
                  total={stats.total}
                  colorClass="bg-amber-500"
                />
                <BreakdownRow
                  label="Overdue"
                  value={stats.overdue}
                  total={stats.total}
                  colorClass="bg-red-500"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function StatCard({ label, value, color }) {
  const colorMap = {
    accent: 'text-accent-400 bg-accent-500/10 border-accent-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  const valueColorMap = {
    accent: 'text-accent-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
  };

  return (
    <div className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-5">
      <p className="text-sm text-surface-500 font-medium">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${valueColorMap[color]}`}>{value}</p>
    </div>
  );
}

function BreakdownRow({ label, value, total, colorClass }) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-surface-300">{label}</span>
        <span className="text-surface-400">{value} ({percentage}%)</span>
      </div>
      <div className="w-full h-1.5 bg-surface-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Dashboard;

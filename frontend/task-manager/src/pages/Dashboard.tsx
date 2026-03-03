import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import type { Task } from '../types';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const fetchTasks = useCallback(async () => {
    if (!authContext?.user?.token) return;
    try {
      const { data } = await axios.get<Task[]>('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${authContext.user.token}` }
      });
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  }, [authContext?.user?.token]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleAddTask = async (title: string) => {
    try {
      const { data } = await axios.post<Task>('http://localhost:5000/api/tasks', { title }, {
        headers: { Authorization: `Bearer ${authContext!.user!.token}` }
      });
      setTasks(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const handleDelete = async (id: string) => {
    setTasks(prev => prev.filter(t => t._id !== id));
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${authContext!.user!.token}` }
      });
    } catch (error) {
      console.error('Error deleting task', error);
      fetchTasks(); // re-sync on error
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    setTasks(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));
    try {
      const { data } = await axios.put<Task>(`http://localhost:5000/api/tasks/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${authContext!.user!.token}` }
      });
      setTasks(prev => prev.map(t => t._id === id ? data : t));
    } catch (error) {
      console.error('Error updating task', error);
      fetchTasks();
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = tasks.filter(t => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; }

        body, #root {
          background: #0a0e1a;
          min-height: 100vh;
        }

        .dashboard-shell {
          min-height: 100vh;
          background: #0a0e1a;
          background-image:
            radial-gradient(ellipse 60% 50% at 70% -10%, rgba(232,201,126,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 10% 80%, rgba(78,100,180,0.05) 0%, transparent 60%);
          padding: 40px 20px 60px;
          font-family: 'DM Sans', sans-serif;
        }

        .dashboard-container {
          max-width: 720px;
          margin: 0 auto;
        }

        /* Header */
        .dashboard-header {
          margin-bottom: 36px;
        }

        .dashboard-eyebrow {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #e8c97e;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dashboard-eyebrow::before {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: #e8c97e;
        }

        .dashboard-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.7rem, 4vw, 2.4rem);
          color: #f0ede8;
          margin: 0 0 4px;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .dashboard-subheading {
          font-size: 0.9rem;
          color: rgba(240,237,232,0.35);
          font-weight: 300;
          font-style: italic;
        }

        /* Stats row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }

        .stat-card {
          padding: 16px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          transition: background 0.2s;
        }

        .stat-card:hover { background: rgba(255,255,255,0.05); }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 1.9rem;
          font-weight: 800;
          line-height: 1;
          color: #f0ede8;
          margin-bottom: 4px;
          letter-spacing: -0.03em;
        }

        .stat-number.gold { color: #e8c97e; }
        .stat-number.green { color: #4ecd84; }
        .stat-number.orange { color: #e8965a; }

        .stat-label {
          font-size: 0.74rem;
          font-weight: 400;
          color: rgba(240,237,232,0.35);
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        /* Progress */
        .progress-section {
          margin-bottom: 32px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .progress-label {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.35);
        }

        .progress-value {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: #e8c97e;
        }

        .progress-bar-track {
          height: 4px;
          background: rgba(255,255,255,0.07);
          border-radius: 99px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #c9942a, #e8c97e);
          transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
        }

        /* Section divider */
        .section-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .section-divider-label {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.3);
          white-space: nowrap;
        }

        .section-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        /* Filter tabs */
        .filter-tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          padding: 4px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          width: fit-content;
        }

        .filter-tab {
          padding: 6px 14px;
          border-radius: 7px;
          border: none;
          background: transparent;
          color: rgba(240,237,232,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.18s ease;
          letter-spacing: 0.01em;
        }

        .filter-tab.active {
          background: rgba(232,201,126,0.12);
          color: #e8c97e;
          font-weight: 500;
        }

        .filter-tab:hover:not(.active) {
          color: rgba(240,237,232,0.65);
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 50px 20px;
        }

        .empty-state-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(240,237,232,0.2);
        }

        .empty-state-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: rgba(240,237,232,0.35);
          margin-bottom: 6px;
        }

        .empty-state-subtitle {
          font-size: 0.85rem;
          color: rgba(240,237,232,0.2);
          font-weight: 300;
        }

        /* Skeleton loading */
        .skeleton-item {
          height: 56px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          margin-bottom: 10px;
          animation: shimmer 1.5s infinite;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 520px) {
          .stats-row { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .stat-card { padding: 12px 14px; }
          .stat-number { font-size: 1.5rem; }
          .dashboard-shell { padding: 24px 16px 40px; }
        }
      `}</style>

      <div className="dashboard-shell">
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <div className="dashboard-eyebrow">Workspace</div>
            <h1 className="dashboard-heading">Your Tasks</h1>
            <p className="dashboard-subheading">
              {completedTasks > 0
                ? `${completedTasks} of ${totalTasks} completed — keep going`
                : totalTasks > 0
                ? 'Ready to get things done?'
                : 'Nothing here yet. Add your first task below.'}
            </p>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-number gold">{totalTasks}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-card">
              <div className="stat-number green">{completedTasks}</div>
              <div className="stat-label">Done</div>
            </div>
            <div className="stat-card">
              <div className="stat-number orange">{pendingTasks}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          {/* Progress bar */}
          {totalTasks > 0 && (
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label">Overall Progress</span>
                <span className="progress-value">{progressPercent}%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          )}

          {/* Form */}
          <TaskForm onAdd={handleAddTask} />

          {/* Task list */}
          <div className="section-divider">
            <span className="section-divider-label">Tasks</span>
            <div className="section-divider-line" />
          </div>

          {/* Filter tabs */}
          <div className="filter-tabs">
            {(['All', 'Pending', 'Completed'] as const).map(f => (
              <button
                key={f}
                className={`filter-tab${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Task cards */}
          {loading ? (
            <div>
              {[1, 2, 3].map(i => <div key={i} className="skeleton-item" />)}
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <line x1="9" y1="12" x2="15" y2="12"/>
                </svg>
              </div>
              <div className="empty-state-title">
                {filter === 'All' ? 'No tasks yet' : `No ${filter.toLowerCase()} tasks`}
              </div>
              <div className="empty-state-subtitle">
                {filter === 'All' ? 'Create your first task using the form above' : `Switch to a different filter or add new tasks`}
              </div>
            </div>
          ) : (
            <div>
              {filteredTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
import React, { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onToggleStatus }) => {
  const isCompleted = task.status === 'Completed';
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(task._id), 280);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .task-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          margin-bottom: 10px;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'DM Sans', sans-serif;
          animation: slideIn 0.3s ease forwards;
          transform-origin: top;
        }

        .task-card.removing {
          opacity: 0;
          transform: translateX(20px) scale(0.97);
        }

        .task-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-1px);
        }

        .task-card.is-completed {
          background: rgba(255,255,255,0.015);
          border-color: rgba(255,255,255,0.04);
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .task-check {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid ${isCompleted ? '#e8c97e' : 'rgba(255,255,255,0.2)'};
          background: ${isCompleted ? 'linear-gradient(135deg, #e8c97e, #c9942a)' : 'transparent'};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .task-check:hover {
          border-color: #e8c97e;
          background: rgba(232, 201, 126, 0.1);
        }

        .task-check svg {
          opacity: ${isCompleted ? '1' : '0'};
          transition: opacity 0.15s ease;
        }

        .task-title {
          flex: 1;
          font-size: 0.95rem;
          font-weight: 400;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
          line-height: 1.4;
          word-break: break-word;
        }

        .task-badge {
          flex-shrink: 0;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: ${isCompleted ? 'rgba(232,201,126,0.12)' : 'rgba(78,205,132,0.12)'};
          color: ${isCompleted ? '#e8c97e' : '#4ecd84'};
          border: 1px solid ${isCompleted ? 'rgba(232,201,126,0.25)' : 'rgba(78,205,132,0.25)'};
        }

        .task-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .task-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s ease;
          background: transparent;
        }

        .task-btn-toggle {
          border-color: rgba(255,255,255,0.08);
          color: rgba(240,237,232,0.4);
        }

        .task-btn-toggle:hover {
          border-color: rgba(232, 201, 126, 0.4);
          color: #e8c97e;
          background: rgba(232,201,126,0.08);
        }

        .task-btn-delete {
          border-color: rgba(255,255,255,0.06);
          color: rgba(240,237,232,0.3);
        }

        .task-btn-delete:hover {
          border-color: rgba(232, 80, 80, 0.4);
          color: #e85050;
          background: rgba(232,80,80,0.08);
        }

        @media (max-width: 480px) {
          .task-card { padding: 13px 14px; gap: 10px; }
          .task-badge { display: none; }
        }
      `}</style>

      <div className={`task-card${isCompleted ? ' is-completed' : ''}${deleting ? ' removing' : ''}`}>
        {/* Clickable check circle */}
        <div className="task-check" onClick={() => onToggleStatus(task._id, task.status)} title={isCompleted ? 'Mark pending' : 'Mark complete'}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#0a0e1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1.5 6 4.5 9 10.5 3" />
          </svg>
        </div>

        <span
          className="task-title"
          style={{
            color: isCompleted ? 'rgba(240,237,232,0.3)' : 'rgba(240,237,232,0.88)',
            textDecoration: isCompleted ? 'line-through' : 'none',
            textDecorationColor: 'rgba(240,237,232,0.25)',
          }}
        >
          {task.title}
        </span>

        <span className="task-badge">{isCompleted ? 'Done' : 'Pending'}</span>

        <div className="task-actions">
          <button
            className="task-btn task-btn-toggle"
            onClick={() => onToggleStatus(task._id, task.status)}
            title={isCompleted ? 'Undo' : 'Complete'}
          >
            {isCompleted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </button>

          <button className="task-btn task-btn-delete" onClick={handleDelete} title="Delete task">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
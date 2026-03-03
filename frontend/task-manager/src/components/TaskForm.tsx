import React, { useState, useRef } from 'react';

interface TaskFormProps {
  onAdd: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  // Removed 'focused' state to fix TS6133: value is never read
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      inputRef.current?.focus();
      return;
    }
    onAdd(title.trim());
    setTitle('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .task-form-wrapper {
          margin-bottom: 28px;
          font-family: 'DM Sans', sans-serif;
        }

        .task-form-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.35);
          margin-bottom: 10px;
        }

        .task-form-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .task-form-input-wrap {
          flex: 1;
          position: relative;
        }

        .task-form-input {
          width: 100%;
          padding: 13px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          color: rgba(240,237,232,0.9);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem;
          font-weight: 400;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
          letter-spacing: 0.01em;
        }

        .task-form-input::placeholder {
          color: rgba(240,237,232,0.22);
        }

        .task-form-input:focus {
          border-color: rgba(232,201,126,0.45);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 3px rgba(232,201,126,0.07);
        }

        .task-form-submit {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 13px 20px;
          background: linear-gradient(135deg, #e8c97e 0%, #c9942a 100%);
          border: none;
          border-radius: 10px;
          color: #0a0e1a;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        .task-form-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(232,201,126,0.25);
          filter: brightness(1.05);
        }

        .task-form-submit:active {
          transform: translateY(0);
        }

        .task-form-submit svg {
          transition: transform 0.2s ease;
        }

        .task-form-submit:hover svg {
          transform: rotate(90deg);
        }

        @media (max-width: 520px) {
          .task-form-submit-text { display: none; }
          .task-form-submit { padding: 13px 15px; }
        }
      `}</style>

      <div className="task-form-wrapper">
        <label className="task-form-label">New Task</label>
        <form onSubmit={handleSubmit} className="task-form-row">
          <div className="task-form-input-wrap">
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // Removed onFocus and onBlur handlers that were setting 'focused'
              placeholder="What needs to be done?"
              className="task-form-input"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="task-form-submit">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span className="task-form-submit-text">Add Task</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
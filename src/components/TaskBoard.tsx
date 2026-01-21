'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Task, TaskStatus, TASK_STATUSES, STATUS_CONFIG } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const config = STATUS_CONFIG[task.status];

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (newStatus === task.status) return;
    
    setIsChangingStatus(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onStatusChange(task.id, newStatus);
      }
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsChangingStatus(false);
    }
  };

  return (
    <div
      className={`
        group relative bg-white rounded-lg shadow-sm border border-gray-200 
        p-4 mb-3 transition-all duration-200 ease-out
        hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5
        ${isChangingStatus ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug pr-2">
          {task.title}
        </h3>
        <div className="flex-shrink-0">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bgColor} ${config.color}`}>
            {config.label}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        <div className="flex gap-1">
          {TASK_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              disabled={isChangingStatus || status === task.status}
              className={`
                px-2 py-0.5 rounded text-xs font-medium transition-all
                ${status === task.status
                  ? `${STATUS_CONFIG[status].bgColor} ${STATUS_CONFIG[status].color}`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 opacity-0 group-hover:opacity-100'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              title={`Move to ${STATUS_CONFIG[status].label}`}
            >
              {STATUS_CONFIG[status].label.charAt(0)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusChange = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4 text-lg font-semibold">{error}</p>
          <button
            onClick={fetchTasks}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first task</p>
          <Link
            href="/add-task"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Create Task
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex gap-4 min-w-max">
        {TASK_STATUSES.map((status) => {
          const statusTasks = getTasksByStatus(status);
          const config = STATUS_CONFIG[status];
          
          return (
            <div
              key={status}
              className="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-sm ${config.color}`}>
                    {config.label}
                  </h3>
                  <span className="px-2 py-0.5 bg-white rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                    {statusTasks.length}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 min-h-[200px]">
                {statusTasks.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">
                    <p>No tasks</p>
                  </div>
                ) : (
                  statusTasks.map((task) => (
                    <div
                      key={task.id}
                      className="animate-in slide-in-from-top-2 duration-200"
                    >
                      <TaskCard task={task} onStatusChange={handleStatusChange} />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

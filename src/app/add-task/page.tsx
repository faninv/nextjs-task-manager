'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskStatus, TASK_STATUSES, STATUS_CONFIG } from '@/types/task';

export default function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('TODO');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('TODO');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, status }),
      });

      if (response.ok) {
        resetForm();
        router.push('/');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Create New Task</h1>
                    <p className="text-gray-600">Add a new task to your board</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            placeholder="Enter task description"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TaskStatus)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                            {TASK_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                    {STATUS_CONFIG[s].label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg font-medium"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Task'}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

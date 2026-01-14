'use client';

import Link from 'next/link';
import TaskBoard from '@/components/TaskBoard';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Task Manager</h1>
          <Link
            href="/add-task"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add New Task
          </Link>
        </header>

        <main>
          <TaskBoard />
        </main>
      </div>
    </div>
  );
}
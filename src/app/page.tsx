'use client';

import Link from 'next/link';
import TaskBoard from '@/components/TaskBoard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6 lg:p-8">
        <div className="max-w-[1920px] mx-auto">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Task Manager
              </h1>
              <p className="text-gray-600">Organize and track your work</p>
            </div>
            <Link
              href="/add-task"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-lg font-medium"
            >
              + New Task
            </Link>
          </header>

          <main>
            <TaskBoard />
          </main>
        </div>
      </div>
    </div>
  );
}
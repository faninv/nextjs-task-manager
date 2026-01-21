export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export const TASK_STATUSES: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];

export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bgColor: string }> = {
  TODO: { label: 'To Do', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  REVIEW: { label: 'Review', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  COMPLETED: { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-100' },
};

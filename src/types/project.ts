import type { Todo } from '@/types';

export type Project = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  todos: Todo[];
}

export type CreateProject = {
  name: string;
  description: string;
}

import type { Project } from '@/types';

export type View =
  | { type: 'home' }
  | { type: 'project'; project: Project }
  | { type: 'createProject' }
  | { type: 'createTodo'; project: Project };

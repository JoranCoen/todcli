import type { Issue, Project } from '@/types';

export type View =
  | { type: 'home' }
  | { type: 'issue'; issue: Issue }
  | { type: 'project'; project: Project }
  | { type: 'createProject' }
  | { type: 'createTodo'; project: Project };

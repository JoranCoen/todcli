import type { Issue, Project, Todo } from '@/types';

export type View =
  | { type: ViewType.Home }
  | { type: ViewType.Issue; issue: Issue }
  | { type: ViewType.Confirmation; message: string }
  | { type: ViewType.Project; project: Project }
  | { type: ViewType.CreateProject }
  | { type: ViewType.CreateTodo; project: Project }
  | { type: ViewType.UpdateTodo; todo: Todo };

export enum ViewType {
  Home = 'home',
  Issue = 'issue',
  Confirmation = 'confirmation',
  Project = 'project',
  CreateProject = 'createProject',
  CreateTodo = 'createTodo',
  UpdateTodo = 'updateTodo',
}

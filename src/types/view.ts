import type { Issue, Project, Todo } from '@/types';

export enum ConfirmationType {
  Project = 'project',
  Todo = 'todo',
}

export enum ViewType {
  Home = 'home',
  Issue = 'issue',
  Confirmation = 'confirmation',
  Project = 'project',
  CreateProject = 'createProject',
  CreateTodo = 'createTodo',
  UpdateTodo = 'updateTodo',
}

export type View =
  | { type: ViewType.Home }
  | { type: ViewType.Issue; issue: Issue }
  | { type: ViewType.Confirmation; message: string; target: ConfirmationType }
  | { type: ViewType.Project; project: Project }
  | { type: ViewType.CreateProject }
  | { type: ViewType.CreateTodo; project: Project }
  | { type: ViewType.UpdateTodo; todo: Todo };

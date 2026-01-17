import fs from 'fs';
import { DATA_FILE, CONFIG_DIR } from '@/lib';
import type { Project, Todo } from '@/types';
import { TodoStatus } from '@/types/todo';

type WriteDataPayload =
  | { type: 'project'; project: Partial<Project> }
  | { type: 'todo'; projectId: number; todo: Partial<Todo> };

export function writeData(payload: WriteDataPayload) {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });

    const data: Record<string, Project> = fs.existsSync(DATA_FILE)
      ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
      : {};

    if (payload.type === 'project') {
      const nextProjectId = Object.values(data).reduce((max, p) => Math.max(max, p.id), 0) + 1;

      const projectId = payload.project.id ?? nextProjectId;

      const project: Project = {
        id: projectId,
        name: payload.project.name ?? `Project ${projectId}`,
        description: payload.project.description ?? '',
        todos: payload.project.todos ?? [],
        createdAt: payload.project.createdAt ?? new Date().toISOString(),
        updatedAt: payload.project.updatedAt ?? new Date().toISOString(),
      };

      const key = `project${project.id}`;
      data[key] = project;
    }

    if (payload.type === 'todo') {
      const projectKey = Object.keys(data).find((k) => data[k].id === payload.projectId);

      if (!projectKey) {
        console.warn(`Project with id ${payload.projectId} not found`);
        return;
      }

      const project = data[projectKey];
      if (!Array.isArray(project.todos)) project.todos = [];

      const nextTodoId = project.todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;

      const todo: Todo = {
        id: payload.todo.id ?? nextTodoId,
        title: payload.todo.title ?? `Todo ${nextTodoId}`,
        description: payload.todo.description ?? '',
        status: payload.todo.status ?? TodoStatus.Pending,
        createdAt: payload.todo.createdAt ?? new Date().toISOString(),
        updatedAt: payload.todo.updatedAt ?? new Date().toISOString(),
      };

      project.todos.push(todo);
      project.updatedAt = new Date().toISOString();
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write data:', err);
  }
}

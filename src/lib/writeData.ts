import { CONFIG_DIR, DATA_FILE } from '@/lib';
import type { CreateTodo, UpdateTodo, Project, Todo, View, CreateProject } from '@/types';
import { IssueType } from '@/types/issue';
import { TodoStatus } from '@/types/todo';
import { ViewType } from '@/types/view';
import fs from 'fs';

type WriteResult = { ok: true; project: Project } | { ok: false; view: View };

function readData(): Record<string, Project> {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeFile(data: Record<string, Project>) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const writeData = {
  createProject(project: CreateProject): WriteResult {
    const data = readData();

    const nextId = Object.values(data).reduce((max, p) => Math.max(max, p.id), 0) + 1;

    const newProject: Project = {
      id: nextId,
      name: project.name ?? `Project ${nextId}`,
      description: project.description ?? '',
      todos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data[`project${nextId}`] = newProject;
    writeFile(data);

    return { ok: true, project: newProject };
  },

  createTodo(projectId: number, todo: CreateTodo): WriteResult {
    const data = readData();

    const projectKey = Object.keys(data).find((k) => data[k].id === projectId);

    if (!projectKey) {
      return {
        ok: false,
        view: {
          type: ViewType.Issue,
          issue: {
            label: 'Error',
            content: `Project with ID ${projectId} not found`,
            type: IssueType.Error,
          },
        },
      };
    }

    const project = data[projectKey];

    const nextTodoId = project.todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;

    const newTodo: Todo = {
      id: nextTodoId,
      title: todo.title ?? `Todo ${nextTodoId}`,
      description: todo.description ?? '',
      status: todo.status ?? TodoStatus.Pending,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    project.todos.push(newTodo);
    project.updatedAt = new Date().toISOString();

    writeFile(data);

    return { ok: true, project };
  },

  updateTodo(projectId: number, todo: UpdateTodo): WriteResult {
    const data = readData();

    const projectKey = Object.keys(data).find((k) => data[k].id === projectId);

    if (!projectKey) {
      return {
        ok: false,
        view: {
          type: ViewType.Issue,
          issue: {
            label: 'Error',
            content: `Project with ID ${projectId} not found`,
            type: IssueType.Error,
          },
        },
      };
    }

    const project = data[projectKey];
    const todoIndex = project.todos.findIndex((t) => t.id === todo.id);

    if (todoIndex === -1) {
      return {
        ok: false,
        view: {
          type: ViewType.Issue,
          issue: {
            label: 'Error',
            content: `Todo with ID ${todo.id} not found in project ${project.name}`,
            type: IssueType.Error,
          },
        },
      };
    }

    project.todos[todoIndex] = {
      ...project.todos[todoIndex],
      ...todo,
      updatedAt: new Date().toISOString(),
    };
    project.updatedAt = new Date().toISOString();

    writeFile(data);

    return { ok: true, project };
  },

  deleteProject(projectId: number): WriteResult {
    const data = readData();

    const projectKey = Object.keys(data).find((k) => data[k].id === projectId);

    if (!projectKey) {
      return {
        ok: false,
        view: {
          type: ViewType.Issue,
          issue: {
            label: 'Error',
            content: `Project with ID ${projectId} not found`,
            type: IssueType.Error,
          },
        },
      };
    }

    const project = data[projectKey];
    delete data[projectKey];

    writeFile(data);

    return { ok: true, project };
  },
};

import fs from 'fs';
import { DATA_FILE, CONFIG_DIR } from '@/lib';
import { TodoStatus } from '@/types/todo';
import { IssueType } from '@/types/issue';
import type { Project, Todo, View } from '@/types';

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
  createProject(project: Partial<Project>): WriteResult {
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

  createTodo(projectId: number, todo: Partial<Todo>): WriteResult {
    const data = readData();

    const projectKey = Object.keys(data).find((k) => data[k].id === projectId);

    if (!projectKey) {
      return {
        ok: false,
        view: {
          type: 'issue',
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
};

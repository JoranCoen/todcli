import type { Issue } from '@/types/issue';
import type { CreateProject, Project } from '@/types/project';
import type { CreateTodo, UpdateTodo, Todo } from '@/types/todo';
import type { View } from '@/types/view';

type Item = {
  label: string;
  value: string;
};

export type { CreateProject, CreateTodo, UpdateTodo, Issue, Item, Project, Todo, View };

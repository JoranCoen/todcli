import type { View } from '@/types/view';
import type { Project, CreateProject } from '@/types/project';
import type { Todo, CreateTodo } from '@/types/todo';
import type { Issue } from '@/types/issue';

type Item = {
  label: string;
  value: string;
};

export type { View, Project, CreateProject, Todo, CreateTodo, Issue, Item };
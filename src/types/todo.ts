export type Todo = {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodo = {
  title: string;
  description: string;
  status: TodoStatus;
};

export type UpdateTodo = {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
};

export enum TodoStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
}

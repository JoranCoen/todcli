export type Todo = {
  id: string;
  name: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateTodo = {
  name: string;
  description: string;
  status: TodoStatus;
}

export enum TodoStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Completed = "completed",
}

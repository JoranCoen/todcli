import { TodoStatus } from '@/types/todo';

const todoStatus = [
  { label: 'Pending', value: TodoStatus.Pending },
  { label: 'In Progress', value: TodoStatus.InProgress },
  { label: 'Completed', value: TodoStatus.Completed },
];

enum Gradient {
  Cristal = 'cristal',
  Teen = 'teen',
  Mind = 'mind',
  Morning = 'morning',
  Vice = 'vice',
  Passion = 'passion',
  Fruit = 'fruit',
  Instagram = 'instagram',
  Atlas = 'atlas',
  Retro = 'retro',
  Summer = 'summer',
  Pastel = 'pastel',
  Rainbow = 'rainbow',
}

export { todoStatus, Gradient };

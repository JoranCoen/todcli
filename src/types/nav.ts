import type { Project } from '@/types';

export type Item = {
  label: string;
  value: string
}

export type NavItem = {
  label: string;
  content: string;
  gradient: NavGradient;
  value: string;
  project: Project | null;
}

export enum NavGradient {
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

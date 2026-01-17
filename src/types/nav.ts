import type { Project } from '@/types';
import { Gradient } from '@/constants';

export type Item = {
  label: string;
  value: string;
};

export type NavItem = {
  label: string;
  content: string;
  gradient: Gradient;
  value: string;
  project: Project | null;
};

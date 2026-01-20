import type { Project } from '@/types';
import { GradientMap } from '@/constants';

export type Item = {
  label: string;
  value: string;
};

export type NavItem = {
  label: string;
  content: string;
  gradient: GradientMap;
  value: string;
  project: Project | null;
};

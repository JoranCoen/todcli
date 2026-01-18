import fs from 'fs';
import { DATA_FILE, CONFIG_DIR } from '@/lib';
import type { Project } from '@/types';

export function readData(): Record<string, Project> {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });

    if (!fs.existsSync(DATA_FILE)) return {};

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    if (!raw.trim()) return {};

    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || Array.isArray(parsed)) {
      console.warn('readData(): data file does not contain a valid object');
      return {};
    }

    return parsed as Record<string, Project>;
  } catch (err) {
    console.error('Failed to read data:', err);
    return {};
  }
}

export function readProject(projectId: number): Project | null {
  const data = readData();
  return Object.values(data).find((p) => p.id === projectId) ?? null;
}

export function readProjects(): Project[] {
  const data = readData();
  return Object.values(data);
}

export function readTodos(projectId: number) {
  const data = readProject(projectId);
  return data ? Object.values(data.todos) : [];
}

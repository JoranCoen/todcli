import { CONFIG_DIR, DATA_FILE } from '@/lib';
import type { Project, View } from '@/types';
import { IssueType } from '@/types/issue';
import { ViewType } from '@/types/view';
import fs from 'fs';

type ReadResult<T> = { ok: true; data: T } | { ok: false; view: View };

export function readData(): ReadResult<Record<string, Project>> {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });

    if (!fs.existsSync(DATA_FILE)) return { ok: true, data: {} };

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    if (!raw.trim()) return { ok: true, data: {} };

    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {
        ok: false,
        view: {
          type: ViewType.Issue,
          issue: {
            label: 'Error',
            content: 'Data file does not contain a valid object',
            type: IssueType.Error,
          },
        },
      };
    }

    return { ok: true, data: parsed as Record<string, Project> };
  } catch (err) {
    return {
      ok: false,
      view: {
        type: ViewType.Issue,
        issue: {
          label: 'Error',
          content: err instanceof Error ? err.message : 'Unknown error reading data',
          type: IssueType.Error,
        },
      },
    };
  }
}

export function readProject(projectId: number): ReadResult<Project | null> {
  const result = readData();
  if (!result.ok) return result;

  const project = Object.values(result.data).find((p) => p.id === projectId) ?? null;
  return { ok: true, data: project };
}

export function readProjects(): ReadResult<Project[]> {
  const result = readData();
  if (!result.ok) return result;

  const projects = Object.values(result.data);
  return { ok: true, data: projects };
}

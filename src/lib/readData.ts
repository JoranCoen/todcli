import fs from 'fs';
import { DATA_FILE, CONFIG_DIR } from '@/lib';

export function readData<T>(): T[] {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });

    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');

    if (!raw.trim()) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      console.warn('readData(): data file does not contain an array');
      return [];
    }

    return parsed as T[];
  } catch (error) {
    console.error('Failed to read data:', error);
    return [];
  }
}

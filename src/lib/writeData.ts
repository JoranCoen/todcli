import fs from 'fs';
import { DATA_FILE, CONFIG_DIR } from '@/lib';

export function writeData<T>(data: T): void {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });

    const existing: T[] = fs.existsSync(DATA_FILE)
      ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
      : [];

    const updated = [...existing, data];

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(updated, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Failed to write data:', error);
  }
}

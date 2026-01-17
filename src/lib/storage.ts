import os from 'os';
import path from 'path';

export const APP_NAME = 'todcli';

export const CONFIG_DIR = path.join(os.homedir(), '.config', APP_NAME);

export const DATA_FILE = path.join(CONFIG_DIR, 'data.json');

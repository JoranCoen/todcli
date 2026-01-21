#!/usr/bin/env node
import { withFullScreen } from 'fullscreen-ink';
import App from './app.js';

withFullScreen(<App />).start();

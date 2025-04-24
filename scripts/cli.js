#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultConfig = `module.exports = {
  theme: {
    colors: {
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: '#e3342f',
    },
    spacing: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
  variants: ['responsive', 'hover', 'focus'],
};`;

const init = () => {
  const configPath = path.join(process.cwd(), 'nexcss.config.js');
  
  if (fs.existsSync(configPath)) {
    console.log('nexcss.config.js already exists');
    process.exit(1);
  }

  try {
    fs.writeFileSync(configPath, defaultConfig);
    console.log('Successfully created nexcss.config.js');
  } catch (error) {
    console.error('Error creating config file:', error);
    process.exit(1);
  }
};

const command = process.argv[2];

switch (command) {
case 'init':
  init();
  break;
default:
  console.log('Unknown command. Available commands: init');
  process.exit(1);
}

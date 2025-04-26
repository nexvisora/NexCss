import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import _path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

export async function initializeProject() {
  const program = new Command();

  program
    .name('aerostyle-init')
    .description('Initialize a new AeroStyle project')
    .option('-y, --yes', 'Skip prompts and use defaults')
    .option('-t, --template <template>', 'Project template (react, vue, svelte, vanilla)')
    .parse(process.argv);

  const options = program.opts();

  let answers = {
    template: 'react',
    typescript: false,
    features: ['responsive', 'darkMode', 'animations']
  };

  if (!options.yes) {
    answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Which framework do you want to use?',
        choices: [
          { name: 'React', value: 'react' },
          { name: 'Vue', value: 'vue' },
          { name: 'Svelte', value: 'svelte' },
          { name: 'Vanilla JS', value: 'vanilla' }
        ]
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Would you like to use TypeScript?',
        default: false
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select additional features:',
        choices: [
          { name: 'Responsive Design', value: 'responsive', checked: true },
          { name: 'Dark Mode', value: 'darkMode', checked: true },
          { name: 'Animations', value: 'animations', checked: true },
          { name: 'CSS Grid System', value: 'grid' },
          { name: 'Typography', value: 'typography' },
          { name: 'Color System', value: 'colors' },
          { name: 'Form Styles', value: 'forms' }
        ]
      }
    ]);
  }

  // Create configuration files
  await createConfigFiles(answers);
  
  // Create entry CSS file
  await createEntryFile(answers);
  
  // Create example component
  await createExampleComponent(answers);
  
  // Update package.json
  await updatePackageJson(answers);

  console.log('\nAeroStyle project initialized successfully! \n');
  console.log('Next steps:');
  console.log('1. Install dependencies:');
  console.log('   npm install');
  console.log('\n2. Start development server:');
  console.log('   npm run dev');
  console.log('\n3. Open your browser and start building!\n');
}

async function createConfigFiles(answers) {
  // Create aerostyle.config.js
  const aerostyleConfig = `/** @type {import('aerostyle').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ${answers.features.map(feature => `'${feature}'`).join(',\n    ')}
  ],
  ${answers.typescript ? 'typescript: true,' : ''}
  darkMode: ${answers.features.includes('darkMode') ? '\'class\'' : 'false'}
}`;

  await fs.writeFile('aerostyle.config.js', aerostyleConfig);

  // Create postcss.config.js
  const postcssConfig = `export default {
  plugins: {
    'aerostyle': {},
    'autoprefixer': {},
    'cssnano': process.env.NODE_ENV === 'production' ? {} : false
  }
}`;

  await fs.writeFile('postcss.config.js', postcssConfig);
}

async function createEntryFile(answers) {
  const css = `@aerostyle base;
@aerostyle components;
@aerostyle utilities;

${answers.features.includes('typography') ? `
/* Custom typography styles */
.prose {
  @apply max-w-65ch leading-relaxed;
}
` : ''}

${answers.features.includes('darkMode') ? `
/* Dark mode overrides */
.dark {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}
` : ''}

${answers.features.includes('animations') ? `
/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
` : ''}
`;

  await fs.writeFile('src/styles/main.css', css);
}

async function createExampleComponent(answers) {
  const componentExt = answers.typescript ? 
    (answers.template === 'react' ? 'tsx' : 'ts') : 
    (answers.template === 'react' ? 'jsx' : 'js');

  let component = '';

  switch (answers.template) {
  case 'react':
    component = `${answers.typescript ? 'import React from "react";\n\n' : ''}export default function Example() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 ${
  answers.features.includes('animations') ? 'animate-fade-in' : ''
}">
          Welcome to AeroStyle
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Start building your awesome project!
        </p>
      </div>
    </div>
  );
}`;
    break;

  case 'vue':
    component = `<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 ${
  answers.features.includes('animations') ? 'animate-fade-in' : ''
}">
        Welcome to AeroStyle
      </h1>
      <p class="text-lg text-gray-700 dark:text-gray-300">
        Start building your awesome project!
      </p>
    </div>
  </div>
</template>

<script ${answers.typescript ? 'lang="ts"' : ''}>
export default {
  name: 'Example'
}
</script>`;
    break;

  case 'svelte':
    component = `<div class="min-h-screen bg-gray-100 dark:bg-gray-900">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 ${
  answers.features.includes('animations') ? 'animate-fade-in' : ''
}">
      Welcome to AeroStyle
    </h1>
    <p class="text-lg text-gray-700 dark:text-gray-300">
      Start building your awesome project!
    </p>
  </div>
</div>

${answers.typescript ? '<script lang="ts">' : '<script>'}
  // Your component logic here
</script>`;
    break;

  default:
    component = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AeroStyle Example</title>
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 ${
  answers.features.includes('animations') ? 'animate-fade-in' : ''
}">
        Welcome to AeroStyle
      </h1>
      <p class="text-lg text-gray-700 dark:text-gray-300">
        Start building your awesome project!
      </p>
    </div>
  </div>
</body>
</html>`;
  }

  await fs.writeFile(`src/components/Example.${componentExt}`, component);
}

async function updatePackageJson(answers) {
  const packageJson = {
    name: 'aerostyle-project',
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      'dev': 'vite',
      'build': 'vite build',
      'preview': 'vite preview'
    },
    dependencies: {
      'aerostyle': 'latest'
    },
    devDependencies: {
      'autoprefixer': '^10.4.16',
      'postcss': '^8.4.32',
      'vite': '^5.0.0',
      'cssnano': '^6.0.2'
    }
  };

  // Add framework-specific dependencies
  switch (answers.template) {
  case 'react':
    packageJson.dependencies['react'] = '^18.2.0';
    packageJson.dependencies['react-dom'] = '^18.2.0';
    if (answers.typescript) {
      packageJson.devDependencies['@types/react'] = '^18.2.0';
      packageJson.devDependencies['@types/react-dom'] = '^18.2.0';
      packageJson.devDependencies['typescript'] = '^5.0.0';
    }
    break;

  case 'vue':
    packageJson.dependencies['vue'] = '^3.3.0';
    if (answers.typescript) {
      packageJson.devDependencies['@vue/typescript'] = '^1.8.0';
      packageJson.devDependencies['typescript'] = '^5.0.0';
    }
    break;

  case 'svelte':
    packageJson.dependencies['svelte'] = '^4.0.0';
    if (answers.typescript) {
      packageJson.devDependencies['typescript'] = '^5.0.0';
      packageJson.devDependencies['@tsconfig/svelte'] = '^5.0.0';
    }
    break;
  }

  await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));
}

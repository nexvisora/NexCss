import fs from 'fs';
import { generateUtilityClasses, createResponsiveClasses } from './src/utilities.js';

// Generate base utility classes
const baseUtilities = generateUtilityClasses();

// Generate responsive variants
const allUtilities = createResponsiveClasses(baseUtilities);

// Write to source CSS file
fs.writeFileSync('./src/generated-utilities.css', allUtilities);

console.log('Utility classes generated successfully!');

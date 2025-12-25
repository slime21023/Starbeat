#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const templateDir = resolve(__dirname, '..', 'template');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  dim: '\x1b[2m'
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function printBanner() {
  log('');
  log('  ✨ Create Starbeat Docs', colors.bright + colors.cyan);
  log('');
}

function printHelp() {
  printBanner();
  log('  Usage:', colors.bright);
  log('    bun create starbeat <project-name>');
  log('    npm create starbeat <project-name>');
  log('');
  log('  Options:', colors.bright);
  log('    -h, --help     Show this help message');
  log('    -v, --version  Show version number');
  log('');
  log('  Example:', colors.bright);
  log('    bun create starbeat my-docs');
  log('');
}

function printVersion() {
  const pkg = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf-8'));
  log(`create-starbeat v${pkg.version}`);
}

function copyTemplate(targetDir, projectName) {
  // Copy all template files
  cpSync(templateDir, targetDir, { recursive: true });

  // Update package.json with project name
  const pkgPath = join(targetDir, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    pkg.name = projectName;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
  }

  // Update meta.yaml with project name
  const metaPath = join(targetDir, 'src', 'meta.yaml');
  if (existsSync(metaPath)) {
    let meta = readFileSync(metaPath, 'utf-8');
    meta = meta.replace(/^title:.*/m, `title: ${projectName}`);
    meta = meta.replace(/^logo:.*/m, `logo: ${projectName}`);
    writeFileSync(metaPath, meta);
  }
}

function main() {
  const args = process.argv.slice(2);

  // Handle flags
  if (args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  if (args.includes('-v') || args.includes('--version')) {
    printVersion();
    process.exit(0);
  }

  // Get project name
  const projectName = args.find(arg => !arg.startsWith('-'));

  if (!projectName) {
    printBanner();
    log('  Error: Please specify a project name', colors.red);
    log('');
    log('  Example:', colors.dim);
    log('    bun create starbeat my-docs', colors.dim);
    log('');
    process.exit(1);
  }

  const targetDir = resolve(process.cwd(), projectName);

  // Check if directory exists
  if (existsSync(targetDir)) {
    log('');
    log(`  Error: Directory "${projectName}" already exists`, colors.red);
    log('');
    process.exit(1);
  }

  printBanner();
  log(`  Creating project in ${colors.cyan}${targetDir}${colors.reset}`);
  log('');

  // Create directory and copy template
  mkdirSync(targetDir, { recursive: true });
  copyTemplate(targetDir, projectName);

  // Success message
  log('  ✅ Project created successfully!', colors.green);
  log('');
  log('  Next steps:', colors.bright);
  log(`    cd ${projectName}`, colors.cyan);
  log('    bun install', colors.cyan);
  log('    bun run dev', colors.cyan);
  log('');
}

main();

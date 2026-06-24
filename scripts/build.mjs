import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'src/rv-tank-level-card.js');
const target = resolve(root, 'dist/rv-tank-level-card.js');

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);

console.log('Built dist/rv-tank-level-card.js from src/rv-tank-level-card.js');

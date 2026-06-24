import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'src/rv-tank-level-card.js');
const target = resolve(root, 'dist/rv-tank-level-card.js');

const [sourceBytes, targetBytes] = await Promise.all([
  readFile(source),
  readFile(target),
]);

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const sourceHash = hash(sourceBytes);
const targetHash = hash(targetBytes);

if (sourceHash !== targetHash) {
  console.error('dist/rv-tank-level-card.js is out of date. Run npm run build.');
  console.error(`src:  ${sourceHash}`);
  console.error(`dist: ${targetHash}`);
  process.exit(1);
}

console.log('Verified dist matches src');

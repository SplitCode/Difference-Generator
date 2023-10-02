import { fileURLToPath } from 'url';
import path from 'path';
// import { dirname } from 'path';
// import fs from 'fs';
import { test, expect } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const firstFile = getFixturePath('__fixtures__/file1.json');
const secondFile = getFixturePath('__fixtures__/file2.json');

// const result = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8')

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('diff', () => {
  expect(genDiff(firstFile, secondFile)).toEqual(result);
});

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

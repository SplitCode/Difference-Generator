import { fileURLToPath } from 'url';
import path from 'path';
// import { dirname } from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const firstFileJson = getFixturePath('file1.json');
const secondFileJson = getFixturePath('file2.json');

const resultJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8');
const resultYml = fs.readFileSync(getFixturePath('resultYml.txt'), 'utf-8');

// const result = `{
//   - follow: false
//     host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 50
//   + timeout: 20
//   + verbose: true
// }`;

test('diffJson', () => {
  expect(genDiff(firstFileJson, secondFileJson)).toEqual(resultJson);
});

test('diffYml', () => {
  expect(genDiff(firstFileJson, secondFileJson)).toEqual(resultYml);
});
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

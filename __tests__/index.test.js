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

const firstFileYml = getFixturePath('file1.yml');
const secondFileYml = getFixturePath('file2.yaml');

// const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
// const resultYml = fs.readFileSync(getFixturePath('resultYml.txt'), 'utf-8');
const result = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8');

test('diffJson', () => {
  expect(genDiff(firstFileJson, secondFileJson)).toEqual(result);
});

test('diffYml', () => {
  expect(genDiff(firstFileYml, secondFileYml)).toEqual(result);
});

// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

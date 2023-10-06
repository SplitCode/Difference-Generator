import { fileURLToPath } from 'url';
import path from 'path';
// import { dirname } from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const firstJson = getFixturePath('file1.json');
const secondJson = getFixturePath('file2.json');
const thirdJson = getFixturePath('file3.json');
const fourthJson = getFixturePath('file4.json');

const firstYml = getFixturePath('file1.yml');
const secondYml = getFixturePath('file2.yaml');
const thirdYml = getFixturePath('file3.yml');
const fourthYml = getFixturePath('file4.yaml');

const resultJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8');
const resultYml = fs.readFileSync(getFixturePath('resultYml.txt'), 'utf-8');
const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');

test('diffJson', () => {
  expect(genDiff(firstJson, secondJson)).toEqual(resultJson);
});

test('diffYml', () => {
  expect(genDiff(firstYml, secondYml)).toEqual(resultYml);
});

test('diffJsonStylish', () => {
  expect(genDiff(thirdJson, fourthJson)).toEqual(resultStylish);
});

test('diffYmlStylish', () => {
  expect(genDiff(thirdYml, fourthYml)).toEqual(resultStylish);
});

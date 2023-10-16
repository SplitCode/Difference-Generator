import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const resultJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8');

test('should be work with json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2)).toBe(resultStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(resultStylish);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(resultJson);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(resultPlain);
});

test('should be work with yml/yaml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');

  expect(genDiff(filepath1, filepath2)).toBe(resultStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(resultStylish);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(resultJson);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(resultPlain);
});

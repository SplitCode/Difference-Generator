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

test('diffJsonStylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(resultStylish);
});

test('diffYmlStylish', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(resultStylish);
});

test('diffJsonPlain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(resultPlain);
});

test('diffYmlPlain', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain')).toEqual(resultPlain);
});

test('diffJson', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(resultJson);
});

test('diffYmlJson', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'json')).toEqual(resultJson);
});

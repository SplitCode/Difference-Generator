import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// import yaml from 'js-yaml';
import parse from './parsers.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath);
const getFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf8');
const getParsedFile = (filepath) => parse(getFormat(filepath), getFile(filepath));

const genDiff = (filepath1, filepath2) => {
  const file1 = getParsedFile(filepath1);
  // console.log(file1);
  const file2 = getParsedFile(filepath2);

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  // console.log(sortedKeys);

  const diff = sortedKeys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return `  + ${key}: ${file2[key]}`;
    } if (!Object.hasOwn(file2, key)) {
      return `  - ${key}: ${file1[key]}`;
    } if (file1[key] !== file2[key]) {
      return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    }
    return `    ${key}: ${file1[key]}`;
  });
  return ['{', ...diff, '}'].join('\n');
};

export default genDiff;

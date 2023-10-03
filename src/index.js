import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const format1 = path.extname(absolutePath1);
  const format2 = path.extname(absolutePath2);

  let file1;
  let file2;

  if (format1 === '.json' || format2 === '.json') {
    file1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf8'));
    file2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf8'));
    // parse = JSON.parse;
  } else if (format1 === '.yml' || format2 === '.yml') {
    file1 = yaml.load(fs.readFileSync(absolutePath1, 'utf8'));
    file2 = yaml.load(fs.readFileSync(absolutePath2, 'utf8'));
    // parse = yaml.safeLoad;
  }

  // const file1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf8'));
  // const file2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf8'));

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

import fs from 'fs';
import path from 'path';
// import _ from 'lodash';
import parse from './parsers.js';
import buildTree from './buildTree.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath); // абсолютный путь
const getFileExt = (filepath) => path.extname(filepath); // получение расширения
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf8'); // чтение файла и возврат в виде строки
// парсинг файла в зависимости от расширения
const getParsedFile = (filepath) => parse(getFileExt(filepath), readFile(filepath));

const genDiff = (filepath1, filepath2) => {
  const file1 = getParsedFile(filepath1);
  const file2 = getParsedFile(filepath2);

  const tree = buildTree(file1, file2);
  return tree;
  // console.log(tree);

  // const keys1 = Object.keys(file1);
  // const keys2 = Object.keys(file2);
  // const keys = _.union(keys1, keys2);
  // const sortedKeys = _.sortBy(keys);
  // // console.log(sortedKeys);

  // const diff = sortedKeys.map((key) => {
  //   // let status;
  //   if (!Object.hasOwn(file1, key)) {
  //     // status = 'added';
  //     return `  + ${key}: ${file2[key]}`;
  //   } if (!Object.hasOwn(file2, key)) {
  //     // status = 'deleted';
  //     return `  - ${key}: ${file1[key]}`;
  //   } if (file1[key] !== file2[key]) {
  //     // status = 'changed';
  //     return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
  //   }
  //   // status = 'unchanged';
  //   return `    ${key}: ${file1[key]}`;
  // });
  // return ['{', ...diff, '}'].join('\n');
};

export default genDiff;

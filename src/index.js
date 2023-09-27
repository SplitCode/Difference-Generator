import fs from 'fs';

import path from 'path';

import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const file1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf8'));

  console.log('File 1 content:', file1);
  console.log('File 2 content:', file2);

//   const keys1 = Object.keys(file1);
//   const keys2 = Object.keys(file2);
//   const keys = _.union(keys1, keys2);

//   const result = {};
//   for (const key of keys) {
//     if (!Object.hasOwn(data1, key)) {
//       result[key] = 'added';
//     } else if (!Object.hasOwn(data2, key)) {
//         result[key] = 'deleted';
//       } else if (data1[key] !== data2[key]) {
//         result[key] = 'changed';
//       } else {
//         result[key] = 'unchanged';
//       }
//     }

//     return result;
};

export default genDiff;

// файлы парсим и обрабатываем через функции readFileSync, path, библиотеки

// (filepath) => path.resolve(process.cwd(), filepath);
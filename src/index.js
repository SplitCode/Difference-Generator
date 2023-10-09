import fs from 'fs';
import path from 'path';
// import _ from 'lodash';
import parse from './parsers.js';
import buildTree from './buildTree.js';
// import makeStylish from '../formatters/stylish.js';
import getFormat from '../formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath); // путь до файла
const getFileExt = (filepath) => path.extname(filepath); // получение расширения
const readFile = (filepath) => fs.readFileSync(getFilePath(filepath), 'utf8'); // чтение файла и возврат в виде строки
// парсинг файла в зависимости от расширения
const getParsedFile = (filepath) => parse(getFileExt(filepath), readFile(filepath));

const genDiff = (filepath1, filepath2, formatName) => {
  const fileData1 = getParsedFile(filepath1);
  const fileData2 = getParsedFile(filepath2);

  const diffTree = buildTree(fileData1, fileData2);
  return getFormat(diffTree, formatName);
  // console.log(tree);
};

export default genDiff;

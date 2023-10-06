import fs from 'fs';
import path from 'path';
// import _ from 'lodash';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import makeStylish from './stylish.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath); // путь до файла
const getFileExt = (filepath) => path.extname(filepath); // получение расширения
const readFile = (filepath) => fs.readFileSync(getFilePath(filepath), 'utf8'); // чтение файла и возврат в виде строки
// парсинг файла в зависимости от расширения
const getParsedFile = (filepath) => parse(getFileExt(filepath), readFile(filepath));

const genDiff = (filepath1, filepath2) => {
  const file1 = getParsedFile(filepath1);
  const file2 = getParsedFile(filepath2);

  const getDiffTree = buildTree(file1, file2);
  return makeStylish(getDiffTree);
  // console.log(tree);
};

export default genDiff;

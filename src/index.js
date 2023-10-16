import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import compareData from './compareData.js';
import getFormat from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(getFilePath(filepath), 'utf8');
const getData = (filepath) => parse(getFileFormat(filepath), readFile(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const diff = compareData(data1, data2);
  return getFormat(diff, formatName);
};

export default genDiff;

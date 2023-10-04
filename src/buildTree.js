import _ from 'lodash';

const data1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const data2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const buildTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  // console.log(keys1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  // console.log(sortedKeys);
  const diff = sortedKeys.map((key) => {
    // let status;
    if (!Object.hasOwn(file1, key)) {
      // status = 'added';
      return `  + ${key}: ${file2[key]}`;
    } if (!Object.hasOwn(file2, key)) {
      // status = 'deleted';
      return `  - ${key}: ${file1[key]}`;
    } if (file1[key] !== file2[key]) {
      // status = 'changed';
      return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    }
    // status = 'unchanged';
    return `    ${key}: ${file1[key]}`;
  });
  return ['{', ...diff, '}'].join('\n');
};

buildTree(data1, data2);

export default buildTree;

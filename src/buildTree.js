import _ from 'lodash';

const buildTree = (fileData1, fileData2) => {
  const keys = _.union(Object.keys(fileData1), Object.keys(fileData2));
  const sortedKeys = _.sortBy(keys);

  const getDiffTree = sortedKeys.map((key) => {
    const value1 = fileData1[key];
    const value2 = fileData2[key];

    if (!Object.hasOwn(fileData1, key)) {
      return { key, value: value2, status: 'added' };
    }
    if (!Object.hasOwn(fileData2, key)) {
      return { key, value: value1, status: 'deleted' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, children: buildTree(value1, value2), status: 'nested' };
    }
    if (value1 !== value2) {
      return {
        key, value1, value2, status: 'changed',
      };
    } return { key, value: value1, status: 'unchanged' };
  });

  return getDiffTree;
};

export default buildTree;

import _ from 'lodash';

const compareData = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const getDiff = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwn(data1, key)) {
      return { key, value: value2, status: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: value1, status: 'deleted' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, children: compareData(value1, value2), status: 'nested' };
    }
    if (value1 !== value2) {
      return {
        key, value1, value2, status: 'changed',
      };
    } return { key, value: value1, status: 'unchanged' };
  });

  return getDiff;
};

export default compareData;

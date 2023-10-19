import _ from 'lodash';

const compareData = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const getDiff = sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: compareData(data1[key], data2[key]), type: 'nested' };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, value1: data1[key], value2: data2[key], type: 'changed',
      };
    } return { key, value: data1[key], type: 'unchanged' };
  });

  return getDiff;
};

export default compareData;

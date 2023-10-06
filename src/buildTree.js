import _ from 'lodash';

// const data1 = {
//   common: {
//     setting1: 'Value 1',
//     setting2: 200,
//     setting3: true,
//     setting6: {
//       key: 'value',
//       doge: {
//         wow: '',
//       },
//     },
//   },
//   group1: {
//     baz: 'bas',
//     foo: 'bar',
//     nest: {
//       key: 'value',
//     },
//   },
//   group2: {
//     abc: 12345,
//     deep: {
//       id: 45,
//     },
//   },
// };

// const data2 = {
//   common: {
//     follow: false,
//     setting1: 'Value 1',
//     setting3: null,
//     setting4: 'blah blah',
//     setting5: {
//       key5: 'value5',
//     },
//     setting6: {
//       key: 'value',
//       ops: 'vops',
//       doge: {
//         wow: 'so much',
//       },
//     },
//   },
//   group1: {
//     foo: 'bar',
//     baz: 'bars',
//     nest: 'str',
//   },
//   group3: {
//     deep: {
//       id: {
//         number: 45,
//       },
//     },
//     fee: 100500,
//   },
// };

const buildTree = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = _.sortBy(keys);

  const diffTree = sortedKeys.map((key) => {
    let result;

    if (!Object.hasOwn(file1, key)) {
      result = { key, value: file2[key], status: 'added' };
    } else if (!Object.hasOwn(file2, key)) {
      result = { key, value: file1[key], status: 'deleted' };
    } else if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      result = { key, children: buildTree(file1[key], file2[key]), status: 'nested' };
    } else if (file1[key] !== file2[key]) {
      result = {
        key, value1: file1[key], value2: file2[key], status: 'changed',
      };
    } else {
      result = { key, value: file1[key], status: 'unchanged' };
    }
    return result;
  });

  return diffTree;
};

// console.log(JSON.stringify(buildTree(data1, data2)));
// console.log(buildTree(data1, data2));

export default buildTree;

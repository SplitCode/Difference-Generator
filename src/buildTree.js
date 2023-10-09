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

const buildTree = (fileData1, fileData2) => {
  const keys = _.union(Object.keys(fileData1), Object.keys(fileData2));
  const sortedKeys = _.sortBy(keys);

  const getDiffTree = sortedKeys.map((key) => {
    let result;

    if (!Object.hasOwn(fileData1, key)) {
      result = { key, value: fileData2[key], status: 'added' };
    } else if (!Object.hasOwn(fileData2, key)) {
      result = { key, value: fileData1[key], status: 'deleted' };
    } else if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      result = { key, children: buildTree(fileData1[key], fileData2[key]), status: 'nested' };
    } else if (fileData1[key] !== fileData2[key]) {
      result = {
        key, value1: fileData1[key], value2: fileData2[key], status: 'changed',
      };
    } else {
      result = { key, value: fileData1[key], status: 'unchanged' };
    }
    return result;
  });

  return getDiffTree;
};

// console.log(JSON.stringify(buildTree(data1, data2)));
// console.log(buildTree(data1, data2));

export default buildTree;

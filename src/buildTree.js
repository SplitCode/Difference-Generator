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
    const value1 = fileData1[key];
    const value2 = fileData2[key];

    let result;

    if (!Object.hasOwn(fileData1, key)) {
      result = { key, value: value2, status: 'added' };
    } else if (!Object.hasOwn(fileData2, key)) {
      result = { key, value: value1, status: 'deleted' };
    } else if (_.isObject(value1) && _.isObject(value2)) {
      result = { key, children: buildTree(value1, value2), status: 'nested' };
    } else if (value1 !== value2) {
      result = {
        key, value1, value2, status: 'changed',
      };
    } else {
      result = { key, value: value1, status: 'unchanged' };
    }
    return result;
  });

  return getDiffTree;
};

// console.log(JSON.stringify(buildTree(data1, data2)));
// console.log(buildTree(data1, data2));

export default buildTree;

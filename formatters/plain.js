import _ from 'lodash';

// const data1 = [{
//   key: 'common',
//   children: [
//     { key: 'follow', value: false, status: 'added' },
//     { key: 'setting1', value: 'Value 1', status: 'unchanged' },
//     { key: 'setting2', value: 200, status: 'deleted' },
//     {
//       key: 'setting3', value1: true, value2: null, status: 'changed',
//     },
//     { key: 'setting4', value: 'blah blah', status: 'added' },
//     { key: 'setting5', value: { key5: 'value5' }, status: 'added' },
//     {
//       key: 'setting6',
//       children: [{
//         key: 'doge',
//         children: [{
//           key: 'wow', value1: '', value2: 'so much', status: 'changed',
//         }],
//         status: 'nested',
//       }, { key: 'key', value: 'value', status: 'unchanged' }, { key: 'ops', value: 'vops', status: 'added' }],
//       status: 'nested',
//     }],
//   status: 'nested',
// }, {
//   key: 'group1',
//   children: [{
//     key: 'baz', value1: 'bas', value2: 'bars', status: 'changed',
//   }, { key: 'foo', value: 'bar', status: 'unchanged' }, {
//     key: 'nest', value1: { key: 'value' }, value2: 'str', status: 'changed',
//   }],
//   status: 'nested',
// }, { key: 'group2', value: { abc: 12345, deep: { id: 45 } }, status: 'deleted' }, { key: 'group3', value: { deep: { id: { number: 45 } }, fee: 100500 }, status: 'added' }];

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const makePlain = (diffTree) => {
  const plainDiff = (node, path = '') => {
    // console.log(path);
    const filteredNodes = node.filter((item) => item.status !== 'unchanged');
    // console.log(filteredNodes);
    const result = filteredNodes.map((item) => {
      const itemPath = `${path}${item.key}`;
      // console.log(itemPath);
      switch (item.status) {
        case 'nested':
          return plainDiff(item.children, `${itemPath}.`);
        case 'added':
          return `Property '${itemPath}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${itemPath}' was removed`;
        case 'changed':
          return `Property '${itemPath}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        default:
          throw new Error(`Unknown status: '${item.status}'!`);
      }
    });
    return result.join('\n');
  };
  return plainDiff(diffTree);
};

// console.log(makePlain(data1));

export default makePlain;

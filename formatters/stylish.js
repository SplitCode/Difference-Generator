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

const generateIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const generateBracketIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - spaceCount);

const stringify = (node, depth = 1) => {
  const currentIndent = generateIndent(depth);
  const childIndent = generateIndent(depth + 1);

  if (!_.isObject(node)) {
    return `${node}`;
  }

  const lines = Object.entries(node)
    .map(([key, value]) => `${childIndent}  ${key}: ${stringify(value, depth + 1)}`)
    .join('\n');
  const result = `{\n${lines}\n${currentIndent}  }`;
  return result;
};

const makeStylish = (diffTree) => {
  const stylishDiff = (tree, depth) => {
    const iterIndent = generateIndent(depth);
    const iterBracketIndent = generateBracketIndent(depth);

    const result = tree.map((node) => {
      switch (node.status) {
        case 'nested':
          return `${iterIndent}  ${node.key}: ${stylishDiff(node.children, depth + 1)}`;
        case 'added':
          return `${iterIndent}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'deleted':
          return `${iterIndent}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return `${iterIndent}- ${node.key}: ${stringify(node.value1, depth)}\n${iterIndent}+ ${node.key}: ${stringify(node.value2, depth)}`;
        case 'unchanged':
          return `${iterIndent}  ${node.key}: ${stringify(node.value, depth)}`;
        default:
          throw new Error(`Unknown status: '${node.status}'!`);
      }
    });

    return ['{', ...result, `${iterBracketIndent}}`].join('\n');
  };
  return stylishDiff(diffTree, 1);
};

// console.log(makeStylish(data1));

export default makeStylish;

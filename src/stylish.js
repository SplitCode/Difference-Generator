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

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const bracketIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - spaceCount);

const stringify = (node, depth = 1) => {
  const iterIndent = indent(depth);
  const depthIndent = indent(depth + 1);
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const lines = Object.entries(node).map(([key, value]) => `${depthIndent}  ${key}: ${stringify(value, depth + 1)}`).join('\n');
  const result = `{\n${lines}\n${iterIndent}  }`;
  return result;
};

const makeStylish = (diffTree) => {
  const stylishDiff = (node, depth) => {
    const iterIndent = indent(depth);
    const iterBracketIndent = bracketIndent(depth);

    const result = node.map((tree) => {
      switch (tree.status) {
        case 'nested':
          return `${iterIndent}  ${tree.key}: ${stylishDiff(tree.children, depth + 1)}`;
        case 'added':
          return `${iterIndent}+ ${tree.key}: ${stringify(tree.value, depth)}`;
        case 'deleted':
          return `${iterIndent}- ${tree.key}: ${stringify(tree.value, depth)}`;
        case 'changed':
          return `${iterIndent}- ${tree.key}: ${stringify(tree.value1, depth)}\n${iterIndent}+ ${tree.key}: ${stringify(tree.value2, depth)}`;
        case 'unchanged':
          return `${iterIndent}  ${tree.key}: ${stringify(tree.value, depth)}`;
        default:
          throw new Error(`Unknown status: '${tree.status}'!`);
      }
    });

    return ['{', ...result, `${iterBracketIndent}}`].join('\n');
  };
  return stylishDiff(diffTree, 1);
};

// console.log(makeStylish(data1));

export default makeStylish;

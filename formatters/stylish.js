import _ from 'lodash';

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
  const generateStylishDiff = (tree, depth) => {
    const iterIndent = generateIndent(depth);
    const iterBracketIndent = generateBracketIndent(depth);

    const result = tree.map((node) => {
      switch (node.status) {
        case 'nested':
          return `${iterIndent}  ${node.key}: ${generateStylishDiff(node.children, depth + 1)}`;
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
  return generateStylishDiff(diffTree, 1);
};

export default makeStylish;

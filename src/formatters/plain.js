import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const makePlain = (diff) => {
  const generatePlainDiff = (node, path = '') => {
    const filteredNodes = node.filter((item) => item.type !== 'unchanged');
    const result = filteredNodes.map((item) => {
      const itemPath = `${path}${item.key}`;
      switch (item.type) {
        case 'nested':
          return generatePlainDiff(item.children, `${itemPath}.`);
        case 'added':
          return `Property '${itemPath}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${itemPath}' was removed`;
        case 'changed':
          return `Property '${itemPath}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        default:
          throw new Error(`Unknown type: '${item.type}'!`);
      }
    });
    return result.join('\n');
  };
  return generatePlainDiff(diff);
};

export default makePlain;

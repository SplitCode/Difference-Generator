import makeStylish from './stylish.js';
import makePlain from './plain.js';

const getFormat = (diffTree, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return makeStylish(diffTree);
    case 'plain':
      return makePlain(diffTree);
    default:
      throw new Error(`Unknown format: '${formatName}'!`);
  }
};

export default getFormat;

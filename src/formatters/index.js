import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const getFormat = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return makeStylish(diff);
    case 'plain':
      return makePlain(diff);
    case 'json':
      return makeJson(diff);
    default:
      throw new Error(`Unknown format: '${formatName}'!`);
  }
};

export default getFormat;

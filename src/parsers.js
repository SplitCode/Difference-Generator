import yaml from 'js-yaml';

const parse = (format, data) => {
  switch (format) {
    case 'json':
      try {
        return JSON.parse(data);
      } catch (error) {
        throw new Error('Invalid JSON');
      }
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension: '${format}'.`);
  }
};

export default parse;

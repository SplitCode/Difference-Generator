import yaml from 'js-yaml';

const parse = (ext, file) => {
  switch (ext) {
    case '.json':
      try {
        return JSON.parse(file);
      } catch (error) {
        throw new Error('Invalid JSON');
      }
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown extension: '${ext}'.`);
  }
};

export default parse;

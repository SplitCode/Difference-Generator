import yaml from 'js-yaml';

const parse = (format, file) => {
  let parsedFile;

  if (format === '.json') {
    parsedFile = JSON.parse(file);
  } else if (format === '.yml' || format === '.yaml') {
    parsedFile = yaml.load(file);
  }
  return parsedFile;
};

export default parse;

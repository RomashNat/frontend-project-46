import yaml from 'js-yaml';

const parse = (fileContent, fileType) => {
  if (fileType === 'yaml' || fileType === 'yml') {
    return yaml.load(fileContent);
  }
  return JSON.parse(fileContent);
};

  export default parse;
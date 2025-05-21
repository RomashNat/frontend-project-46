import yaml from 'js-yaml';

const parse = (fileContent, fileType) => {
  try {
    if (fileType === 'yaml' || fileType === 'yml') {
      return yaml.load(fileContent);
    }
    if (fileType === 'json') {
      return JSON.parse(fileContent);
    }
  }
  catch (error) {
    console.log('Error reading file');
    return null
  }
};

export default parse;
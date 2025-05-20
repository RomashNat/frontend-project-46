import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import _ from 'lodash';

const getFileType = (filePath) => {
  const extname = path.extname(filePath);
  if (extname === '.yml' || extname === '.yaml') {
    return 'yaml';
  }
  return 'json';
};

const genDiff = (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const fileType1 = getFileType(filepath1);
  const fileType2 = getFileType(filepath2);

  const parsedData1 = parser(content1, fileType1);
  const parsedData2 = parser(content2, fileType2);

  const uniqueKeys = _.union(Object.keys(parsedData1), Object.keys(parsedData2));
  const sortedKeys = _.sortBy(uniqueKeys);

  const diff = sortedKeys.map((key) => {
    if (!(key in parsedData1)) {
      return `+ ${key}: ${parsedData2[key]}`;
    }
    if (!(key in parsedData2)) {
      return `- ${key}: ${parsedData1[key]}`;
    }
    if (parsedData1[key] !== parsedData2[key]) {
      return `- ${key}: ${parsedData1[key]}\n+ ${key}: ${parsedData2[key]}`;
    }
    return `  ${key}: ${parsedData1[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;





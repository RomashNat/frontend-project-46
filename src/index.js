import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
    
    const parsedData1 = parser(content1);
    const parsedData2 = parser(content2);

    const keys1 = Object.keys(parsedData1);
    const keys2 = Object.keys(parsedData2);
    const uniqueKeys = _.uniq([...keys1, ...keys2]);

    const diff = uniqueKeys.map((key) => {
      if (!(key in parsedData1)) {
        return `+ ${key}: ${parsedData2[key]}`;
      }
      if (!(key in parsedData2)) {
        return `- ${key}: ${parsedData1[key]}`;
      }
      if (parsedData1[key] !== parsedData2[key]) {
        return `- ${key}: ${parsedData1[key]}\n+ ${key}: ${parsedData2[key]}`;
      }
      return null;
    }).filter((line) => line !== null)
      .join('\n');

    return `{\n${diff}\n}`;
};

  export default genDiff;
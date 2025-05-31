import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import selectFormat from './formatters/format.js';
import findDiff from './findDiff.js';


const getFileType = (filePath) => {
  const extname = path.extname(filePath);
  if (extname === '.yml' || extname === '.yaml') {
    return 'yaml';
  }
  return 'json';
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const fileType1 = getFileType(filepath1);
  const fileType2 = getFileType(filepath2);

  const parsedData1 = parser(content1, fileType1);
  const parsedData2 = parser(content2, fileType2);

   const diff = findDiff(parsedData1, parsedData2);

   return selectFormat(diff, formatName);
   
};

export default genDiff;






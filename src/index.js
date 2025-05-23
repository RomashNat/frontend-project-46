import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import _ from 'lodash';

const { isObject } = _;

const getFileType = (filePath) => {
  const extname = path.extname(filePath);
  if (extname === '.yml' || extname === '.yaml') {
    return 'yaml';
  }
  return 'json';
};

const findDiff = (obj1, obj2) => {

  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);

  const allKeys = _.sortBy(_.union(key1, key2));

  const result = allKeys.reduce((acc, key) => {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      const temp = findDiff(obj1[key], obj2[key]);
      acc.push({
        key,
        type: 'nested',
        children: temp
      })
    }
    if (!key2.includes(key)) {
      acc.push({
        key,
        type: 'remove',
        value: obj1[key]
      })
    }
    if (!key1.includes(key)) {
      acc.push({
        key,
        type: 'add',
        value: obj2[key]
      })
    }
    if (obj1[key] !== obj2[key]) {
      acc.push({
        key,
        type: 'changed',
        oldValue: obj1[key],
        newValue: obj2[key]
      })
    }
    if (obj1[key] === obj2[key]) {
      acc.push({
        key,
        type: 'unchanged',
        value: obj1[key]
      })
    }
    return acc;
  }, [])
  return result;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const fileType1 = getFileType(filepath1);
  const fileType2 = getFileType(filepath2);

  const parsedData1 = parser(content1, fileType1);
  const parsedData2 = parser(content2, fileType2);
  const diff = findDiff(parsedData1, parsedData2);
  // осталось отформатировать согласно расширению файлов и вернуть результат
  try {
    if (format === 'stylish') {
      return stylish(diff);
    }
    if (format === 'plain') {
      return plain(diff);
    }
    throw new Error(`Unknown format: ${format}`);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default genDiff;






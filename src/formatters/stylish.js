import _ from 'lodash';

const formatStylish = (diff, depth = 0) => {
    const indent = '  '.repeat(depth);
    const lines = diff.map((node) => {
      const { key, type, value, oldValue, newValue, children } = node;
      
      switch (type) {
        case 'nested':
          return `${indent}  ${key}: ${stylish(children, depth + 1)}`;
        case 'remove':
          return `${indent}- ${key}: ${value}`;
        case 'add':
          return `${indent}+ ${key}: ${value}`;
        case 'changed':
          return `${indent}- ${key}: ${oldValue}\n${indent}+ ${key}: ${newValue}`;
        case 'unchanged':
          return `${indent}  ${key}: ${value}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  
    return `{\n${lines.join('\n')}\n${indent}}`;
  };
  
export default formatStylish;
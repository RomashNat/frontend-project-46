import _ from 'lodash';

const getIdent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - 2);
const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - spacesCount);

const stringify = (data, depth = 1) => {
  if (data === null || !_.isObject(data) && !_.isArray(data)) return `${data}`;

  const currentIndent = getIdent(depth);
  const bracketIndent = getBracketIndent(depth);
  const currentValue = Object.entries(data);

  const lines = currentValue.map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);
  
  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  return result;
};

const formatStylish = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const currentIndent = getIdent(depth);
    const bracketIndent = getBracketIndent(depth);
    const lines = currentValue.flatMap((node) => {
      const {
        key, children, type, oldValue, newValue,
      } = node;
      switch (type) {
        case 'nested':
          return [`${currentIndent}  ${key}: ${iter(children, depth + 1)}`];
        case 'remove':
          return [`${currentIndent}- ${key}: ${stringify(oldValue, depth + 1)}`];
        case 'added':
          return [`${currentIndent}+ ${key}: ${stringify(newValue, depth + 1)}`];
        case 'unchanged':
          return [`${currentIndent}  ${key}: ${stringify(oldValue, depth + 1)}`];
        case 'changed':
          return [
            `${currentIndent}- ${key}: ${stringify(oldValue, depth + 1)}`,
            `${currentIndent}+ ${key}: ${stringify(newValue, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown type ${type}.`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(tree);
};

export default formatStylish;
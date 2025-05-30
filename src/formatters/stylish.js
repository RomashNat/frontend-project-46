import _ from 'lodash';

const getIdent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - 2);
const getBrackeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - spacesCount);

const stringify = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return `${data}`;

  const currentIndent = getIdent(depth);
  const bracketIndent = getBrackeIndent(depth);
  const currentValue = Object.entries(data);

  const lines = currentValue.map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);

  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  return result;
};

const formatStylish = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const currentIndent = getIdent(depth);
    const bracketIndent = getBrackeIndent(depth);
    const lines = currentValue.flatMap((node) => {
      const {
        key, children, type, oldValue, newValue,
      } = node;
      console.log(type);
      switch (type) {
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${stringify(oldValue, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(newValue, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(oldValue, depth + 1)}`;
        case 'modified':
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
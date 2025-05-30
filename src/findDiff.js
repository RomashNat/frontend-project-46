import _ from 'lodash';

const { isObject } = _;

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
          type: 'removed',
          value: obj1[key]
        })
      }
      if (!key1.includes(key)) {
        acc.push({
          key,
          type: 'added',
          value: obj2[key]
        })
      }
      if (obj1[key] !== obj2[key]) {
        acc.push({
          key,
          type: 'modified',
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

  export default findDiff;
  
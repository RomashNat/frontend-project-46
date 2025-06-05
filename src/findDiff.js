import _ from 'lodash'

const findDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 }
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 }
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: findDiff(value1, value2) }
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        value1,
        value2,
      };
    }
    return { key, type: 'unchanged', value: value1 }
  })
}

export default findDiff

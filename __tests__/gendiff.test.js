import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturesPath = (filename) => path.resolve('__fixtures__', filename);
const result = fs.readFileSync(getFixturesPath('result.txt'), 'utf-8').trim();

test('genDiff', () => {
    const filePath1 = getFixturesPath('file1.json');
    const filePath2 = getFixturesPath('file2.json');
    const calculatedDiff = genDiff(filePath1, filePath2, 'stylish');

    console.log('Diff for json:', calculatedDiff);
    console.log('Expected json:', result);

    expect(calculatedDiff).toEqual(result);
  });
  
  test('gendiff for yaml', () => {
    const filePath1 = getFixturesPath('file1.yml');
    const filePath2 = getFixturesPath('file2.yml');
    const calculatedDiff = genDiff(filePath1, filePath2, 'plain');

    console.log('Diff for yml:', calculatedDiff);
    console.log('Expected yml:', result);

    expect(calculatedDiff).toEqual(result);
  });
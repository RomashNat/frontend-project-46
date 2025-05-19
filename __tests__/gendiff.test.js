import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';


const getFixturesPath = (filename) => path.resolve('__fixtures__', filename);
const result = fs.readFileSync(getFixturesPath('result.txt'), 'utf-8').trim();

test('genDiff', () => {
    const filePath1 = getFixturesPath('file1.json').trim();
    const filePath2 = getFixturesPath('file2.json').trim();
    const calculatedDiff = genDiff(filePath1, filePath2);
    
    console.log(calculatedDiff);
    expect(calculatedDiff).toEqual(result);
  });
  
import fs from 'fs';
import path from 'path';
import parser from './parser.js';

const genDiff = (filepath1, filepath2) => {
    const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
    
    const parsedData1 = parser(content1);
    const parsedData2 = parser(content2);

     return JSON.stringify(parsedData1) === JSON.stringify(parsedData2);
}

  export default genDiff;
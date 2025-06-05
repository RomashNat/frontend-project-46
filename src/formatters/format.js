import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';


const selectFormat = (diff, format) => {

    switch (format) {
        case 'stylish':
            return formatStylish(diff);
        case 'plain':
            return formatPlain(diff);
        case 'json':
            return formatJson(diff);

        default:
            throw new Error(`Unknown format: ${format}`);
    }

};

export default selectFormat;
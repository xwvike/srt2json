const str2json = require('../index.js');
const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.resolve(__dirname, './test.srt'), 'utf-8');

console.log(str2json(file));
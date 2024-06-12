# srt2json

Converts srt files to json format.
```javascript
const srt2json = require('srt2json');
const srt = '1\n00:00:00,000 --> 00:00:01,000\nHello World!';
const json = srt2json(srt);
console.log(json); 
// [{ index: 1, start: 0, end: 1000, text: 'Hello World!' }]
```
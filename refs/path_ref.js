const path = require('path');

console.log(path.basename(__filename)); // path_ref.js
console.log(path.dirname(__filename)); // D:\HW nodejs\refs
console.log(path.extname(__filename)); // .js

console.log(path.parse(__filename).root); // D:\

console.log(path.join(__dirname, '..', 'test/', '/1.js')); // D:\HW nodejs\test\1.js

console.log(path.resolve(__dirname, '..', 'test/', '/1.js')); // D:\1.js
const path = require('path');

// __dirname - в какой папке находится текущий скрипт, полный путь
// __filename - в какой папке находится текущий скрипт, полный путь с названием текущего файла

console.log(path.basename(__filename)); // path_ref.js - имя файла
console.log(__dirname);
console.log(path.dirname(__filename)); // D:\HW nodejs\refs - путь до файла
console.log(path.extname(__filename)); // .js - расширение файла

console.log(path.parse(__filename));
// path.parse - разбирает пусть в объект
// {
//   root: 'C:\\',
//   dir: 'C:\\my_projects\\nodejs_study\\refs',
//   base: 'path_ref.js',
//   ext: '.js',
//   name: 'path_ref'
//  }

console.log(path.parse(__filename).root); // D:\

console.log(path.join(__dirname, '..', 'test/', '/1.js')); // C:\my_projects\nodejs_study\test\1.js

console.log(path.resolve(__dirname, '..', 'test/', '/1.js')); // C:\1.js - resolve по другому обрабатывает абсолютные пути в отличие от join

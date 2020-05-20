const fs = require('fs');
const path = require('path');

fs.appendFile(
  path.join(__dirname, 'notes', 'mynotes.txt'),
  ' From append file',
  (err) => {
    if (err) throw new Error(err);
    console.log('файл был изменен');
  }
)
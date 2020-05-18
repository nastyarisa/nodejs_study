const fs = require('fs');
const path = require('path')

// File System

// создание папки
// fs.mkdirSync - синхронный метод, не рекомендуется использовать синхронные методы
// fs.mkdir(path, callback) - асинхронный метод

fs.mkdir(path.join(__dirname, 'notes'), (err) => {
    // err всегда идет первым параметором
    // повторное создание выбрасывает ошибку
    if (err) throw new Error(err);
    console.log('папка была создана')
})

// создание файла

fs.writeFile(
  path.join(__dirname, 'notes', 'mynotes.txt'), // по какому пути создаем
  'Hello world', // содержимое файла
  (err) => { // коллбэк
    if (err) throw new Error(err);
    console.log('файл был создан');
    fs.appendFile(
      path.join(__dirname, 'notes', 'mynotes.txt'),
      ' From append file',
      (err) => {
        if (err) throw new Error(err);
        console.log('файл был изменен');
      }
    )
  }
);

// чтение файла

fs.readFile(
  path.join(__dirname, 'notes', 'mynotes.txt'), 
  'utf-8',
  (err, data) => {
    if (err) throw new Error(err);
    console.log(data);
  }  
)

fs.readFile(
  path.join(__dirname, 'notes', 'mynotes.txt'),
  (err, data) => {
    if (err) throw new Error(err);
    console.log(Buffer.from(data).toString());
  }
)

// переименование файла

fs.rename(path.join(__dirname, 'notes', 'mynotes.txt'), path.join(__dirname, 'notes', 'notes.txt'), (err) => {
    if (err) throw new Error(err);
    console.log('файл переименован');
})
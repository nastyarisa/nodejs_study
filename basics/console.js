// process.argv - массив с параметрами консоли
// первые два аргумента - путь до node и путь до запускаемого файла
// остальные элементы массива - содержимое консоли, разделенное пробелами

function consoleToJSON() {
  const c = {}

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i].split('=');
    c[arg[0]] = arg[1] ? arg[1] : true
  }
  return c
}

console.log(consoleToJSON())
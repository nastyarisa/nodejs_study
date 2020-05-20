const http = require('http');
const fs = require('fs');
const path = require('path')

// создание сервера
// http.createServer(handler)
// handler будет вызываться тогда, когда будут происходить запросы на сервер


const server = http.createServer((req, res) => {
  // req - отвечает за запрос на сервер
  // res - ответ сервера
  // console.log(req.url)
  // res.write('<h1>Hello from Node.js</h1>')
  // res.write('<h2>Hello from Node.js</h2>')
  // res.write('<h3>Hello from Node.js</h3>')
  // res.end('<h4 style="background: blue">The end</h4>') // закрываем этот ответ
  if (req.method === "GET") {
    // записываем заголовки для ответа
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    if (req.url === "/") {
      fs.readFile(
        path.join(__dirname, 'views', 'index.html'),
        'utf-8',
        (err, content) => {
          if (err) throw err;
          res.end(content)
        }
      )
    } else if (req.url === '/about') {
      fs.readFile(
        path.join(__dirname, 'views', 'about.html'),
        'utf-8',
        (err, content) => {
          if (err) throw err;
          res.end(content)
        }
      )
    } else if (req.url === '/api/users') {
      res.writeHead(200, {
        'Content-Type': 'text/json'
      })

      const users = [
        {name: 'Nastya', age: 28},
        {name: 'Anton', age: 32},
      ]
      res.end(JSON.stringify(users))
    } else {
      res.end()
    }

  } else if (req.method === 'POST') {
    const body = [];

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    // прослушиваем 'data', он может вызываться много раз, в зависимости от того
    // сколько данных прилетает. В data приходит Buffer
    req.on('data', data => {
      body.push(Buffer.from(data))
    })

    req.on('end', () => {
      const message = body.toString().split('=')[1]
      res.end(`
        <h1>Ваше сообщение: ${message}</h1>
        `)
    })


  }

});

// запуск сервера
// listen(port, callback)
// port - на котором будет запущен сервер
// callback - будет выполнен, когда сервер будет запущен
server.listen(3000, () => {
  console.log('Server is running')
})
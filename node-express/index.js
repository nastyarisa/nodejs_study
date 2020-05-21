const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express(); // аналог http.createServer

const hbs = exphbs.create({
  defaultLayout: 'main', // основной layout
  extname: 'hbs' // кастомное расширение
});

// регистрируем hbs как движок для рендеринга html-страниц
app.engine('hbs', hbs.engine);
// указываем что надо использовать hbs в express
app.set('view engine', 'hbs');
// указываем название папки где будут храниться шаблоны
app.set('views', 'views');

// позволяет добавлять новую функциональность
app.use(express.static('public'))

// метод, который позволяет обрабатывать различные get запросы
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', 'index.html'))
  res.render('index')
});

app.get('/about', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', 'about.html'))
  res.render('about')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
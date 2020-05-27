const express = require('express');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cartRoutes = require('./routes/cart');

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
app.use(express.urlencoded({extended:true}))
// первый параметр задат префиксы
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add_course', addRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
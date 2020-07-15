const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cartRoutes = require('./routes/cart');


const app = express(); // аналог http.createServer

// app.engine('handlebars', exphbs({
//   handlebars: allowInsecurePrototypeAccess(Handlebars)
// }));
// app.set('view engine', 'handlebars');

const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
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
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
// первый параметр задат префиксы
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add_course', addRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

start();

async function start() {
  try {
    const url = "mongodb+srv://smirnova:9eFRDnEzZjhfmR5H@cluster0-puwkl.mongodb.net/shop"

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
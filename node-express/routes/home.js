const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', 'index.html')) - другой способ отправить html файл
  res.render('index', { // объект, куда мы можем передавать различные опции
    title: 'Home page',
    isHome: true,
  })
})

module.exports = router
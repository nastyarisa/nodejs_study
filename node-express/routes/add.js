const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('add_course', {
    title: 'Add course',
    isAddCourse: true
  })
})

router.post('/', (req, res) => {
  console.log('req', req.body);
  res.redirect('/courses')
})

module.exports = router
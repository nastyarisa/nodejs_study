const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses: [...courses]
  })
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render('course', {
    layout: 'empty',
    title: `Course ${course.title}`,
    course
  })
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
  const course = await Course.findById(req.params.id);
  res.render('course_edit', {
    title: `Edit course ${course.title}`,
    course
  })
});

router.post('/edit', async (req, res) => {
  const {id, ...update} = req.body;
  await Course.findByIdAndUpdate(id, update);
  res.redirect('/courses')
});

router.post('/remove', async (req, res) => {
  try {
    await Course.deleteOne({_id: req.body.id});
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
});

module.exports = router
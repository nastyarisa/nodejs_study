const {Router} = require('express');
// const Cart = require('../models/cart_old');
const Course = require('../models/course');

const router = Router();

function mapCartItems(cart) {
  return cart.items.map((item => {
    return {
      ...item.courseId._doc,
      count: item.count
    }
  }))
}

function computePrice(courses) {
  return courses.reduce((sum, course) => sum + (course.count * course.price) ,0)
}

router.post('/add', async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect('/cart')
});

router.get('/', async (req, res) => {
  const user = await req.user
    .populate('cart.items.courseId')
    .execPopulate();

  const courses = mapCartItems(user.cart)

  res.render('cart', {
    isCart: true,
    title: 'Cart',
    courses: courses,
    price: computePrice(courses)
  })
})

router.delete('/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id)
  res.status(200).json(cart)
})

module.exports = router;
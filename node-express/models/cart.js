const path = require('path');
const fs = require('fs');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

class Cart {
  static async add(course) {
    const cart = await this.fetch();
    let candidate = cart.courses.find(c => c.id === course.id);

    if (candidate) {
      candidate.count++
    } else {
      course.count = 1;
      cart.courses.push(course)
    }

    cart.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) reject(err);
        resolve()
      })
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        p, 'utf-8', (err, content) => {
          if (err) reject(err);
          console.log('content', content)
          resolve(JSON.parse(content))
        }
      )
    })
  }

}

module.exports = Cart;
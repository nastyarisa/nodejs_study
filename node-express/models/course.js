const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path')

class Course {
  constructor({title, price, img}) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuidv4();
  }

  course() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    }
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.course())
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) reject(err);
          resolve()
        }
      )
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8',
        (err, content) => {
          if (err) reject(err);
          resolve(JSON.parse(content))
        }
      )
    })
  }
}

module.exports = Course;
const EventEmitter = require('events')

// EventEmitter добавляет функционал который позволяет прослушивать события

class Logger extends EventEmitter {
  log(message) {
    // this.emit(name, data) - 'выбрасывает' событие
    // name - название события, которое хатим заэммитить
    // data - данные, которые хотим передать
    this.emit('message', `${message} ${Date.now()}`)
  }
}

const logger = new Logger()

// logger.on - устанавливает прослушку события
logger.on('message', data => {
  console.log(data)
})

logger.log('Hello')
// logger.emit()


const processMessage = require('../../hooks/process-message');
const engine = require('./messages.engine');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      processMessage(),
      context => {
        // 将done指令发送到app端
        let d = context.data,
          commands = context.app.service('commands'),
          messages = context.service
        if (d.type === 'checkin') {
          // bind sn to task 给connection染色 加上sn
          context.params.connection.payload.sn = d.params.sn
        }
        if (d.type === 'goto') {
          commands.emit(d.type, d.params)
        }
        if (d.type === 'hello') {
          console.log('HELLO//////////////////////////////////////', d.params)
          messages.emit('hello', d.params)
        }
        if (d.type === 'done' || d.type === 'ready') {
          let connection = context.params.connection
          // 从connection payload里拿到sn
          d.params.sn = connection.payload.sn
          messages.emit(d.type, d.params)
          let next = engine.afterDone(d)
          console.log('message hooks before create-----------%%%%%%%%%%%%%', next)
          if (next) {
            commands.emit(next.type, next.params)
          }
        }
        if (d.type === 'checkout') {
          console.log('HELLO//////////////////////////////////////', d.params)
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

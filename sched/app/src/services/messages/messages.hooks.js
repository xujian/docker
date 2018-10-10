

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
        let d = context.data
        if (d.type === 'done') {
          let connection = context.params.connection
          d.params.sn = connection.payload.sn
          context.service.emit('done', d.params)
          let next = engine.afterDone(d)
          console.log('message hooks before create-----------%%%%%%%%%%%%%', next)
          if (next) {
            context.app.service('command').emit(next.type, next.params)
          }
        }
        if (d.type === 'on-position') {
          let next = engine.afterPosition(d)
          console.log('message hooks before create-----------%%%%%%%%%%%%%', next)
          if (next) {
            context.app.service('command').emit(next.type, next.params)
          }
        }
        // 直接将goto分发给app
        if (d.type === 'goto') {
          context.app.service('command').emit(d.type, d.params)
        }
        if (d.type === 'checkin') {
          // bind sn to task 给connection染色 加上sn
          context.params.connection.payload.sn = d.params.sn
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

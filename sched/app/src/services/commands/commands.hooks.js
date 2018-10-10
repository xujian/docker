const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      context => {
        // 将done/goto指令发送到app端
        let d = context.data
        console.log('command before create --------------------------------', d)
        if (d.name === 'goto') {
          context.service.emit('goto', d.params)
          // context.app.emit(d.name, d.data) // not work 发不出去
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

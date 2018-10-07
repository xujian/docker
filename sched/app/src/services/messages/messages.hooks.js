

const processMessage = require('../../hooks/process-message');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // processMessage(),
      context => {
        // 将done指令发送到app端
        let d = context.data
        if (d.type === 'done') {
          let connection = context.params.connection
          console.log('message hook before create ++++++++++++++++++', 
            connection.payload)
          d.params.sn = connection.payload.sn
          context.service.emit('done', d.params)
        }
        if (d.type === 'checkin') {
          // bind sn to task
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

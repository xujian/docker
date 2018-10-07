const hooks = require('./command.hooks');

class CommandService {
  constructor() {
    this.events = ['goto', 'scan', 'draw', 'photo'];
  }
  create (data, params) {
    // this.app.emit(params.name, params.data)
    return Promise.resolve(data);
  }
	setup(app, path) {
    this.app = app;
  }
}

module.exports = function (app) {
  app.use('/command', new CommandService());
  let service = app.service('command')
  service.publish('goto', (data, context) => {
    return [
      // app.channel('admin'),
      // app.channel('authenticated')
      app.channel(app.channels).filter(connection => {
        return connection.user.role === 'app' && 
          connection.payload.sn === '100000000088'
      })
    ]
  })
  service.publish('scan', 'draw', 'photo', (data, context) => {
    return [
      app.channel('admin'),
      app.channel('machine')
    ]
  })
  service.hooks(hooks);
};

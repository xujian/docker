const hooks = require('./commands.hooks');

class CommandService {
  constructor() {
    this.events = ['goto'];
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
  app.use('/commands', new CommandService());
  let service = app.service('commands')

  // channel 分发路径
  service.publish('goto', (data, context) => {
    return [
      // app.channel('admin'),
      // app.channel('authenticated')
      // 仅分发给指定sn的手机
      app.channel(app.channels).filter(connection => {
        return connection.user &&
          connection.user.role === 'app' && 
          connection.payload.sn === '100000000088'
      })
    ]
  })
  service.hooks(hooks);
};

// Initializes the `messages` service on path `/messages`
const createService = require('feathers-mongoose');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    events: [
      'done',
      'ready',
      'goto',
      'checkin',
      'hello',
      'checkout'
    ]
  };

  // Initialize our service with any options it requires
  app.use('/messages', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('messages');
  service.publish('done', 'ready', () => [ // app -> server -> machine
    app.channel('admin'),
    app.channel('machine')
    // app.channel('apps'),
    // app.channel('authenticated')
  ])
  service.publish('hello', () => [ // machine -> server -> app
    app.channel('admin'),
    app.channel('app')
  ])
  service.publish('checkout', () => [ // machine -> server
    app.channel('admin')
  ])
  service.publish('created', () => [])
  service.hooks(hooks);
};

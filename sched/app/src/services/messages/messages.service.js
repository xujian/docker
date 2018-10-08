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
      'done', // machine => server
      'on-stage', // app => server
      'command' // machine => server
    ]
  };

  // Initialize our service with any options it requires
  app.use('/messages', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('messages');
  service.publish('done', 'on-stage', () => [
      // app.channel('admin')
      // app.channel('apps'),
      // app.channel('authenticated')
  ])
  service.publish('created', () => [])
  service.hooks(hooks);
};

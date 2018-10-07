const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const tasks = require('./tasks/tasks.service.js');
const command = require('./command/command.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(messages);
  app.configure(users);
  app.configure(tasks);
  app.configure(command);
};

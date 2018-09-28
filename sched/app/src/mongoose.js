const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

module.exports = function (app) {
  mongoose.connect(app.get('mongodb'), {
  	useNewUrlParser: true
  }).then(() => {
  })
  autoIncrement.initialize(mongoose.connection);
  mongoose.Promise = global.Promise;
  app.set('mongooseClient', mongoose);
};

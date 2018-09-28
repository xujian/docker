// tasks-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const autoIncrement = require('mongoose-auto-increment');
  const { Schema } = mongooseClient;
  const tasks = new Schema({
    product: {
    	type: String,
    	required: true
    }, // 检测手机条码
    stage: {
    	type: Number,
    	required: true,
    	default: 0
    },
    active: {
    	type: Boolean, // 正在检测
    	default: true
    },
    finishedAt: {
    	type: Date
    }
  }, {
    timestamps: true
  });

  // auto Increment field number
  tasks.plugin(autoIncrement.plugin, {
    model: 'Task',
    field: 'number',
    startAt: 10000
  });

  return mongooseClient.model('tasks', tasks);
};

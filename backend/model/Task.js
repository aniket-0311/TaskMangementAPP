const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task_name: {
    type: String,
    required: true
  },
  list_id:{
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  completed:{
    type:Boolean,
    default:false
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  list_name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
},
{ timestamps: true }
);

module.exports = mongoose.model('List', listSchema);

const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  position: String,
  body: String,
  username: String,
  company: String,
  mailto: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('Post', postSchema);

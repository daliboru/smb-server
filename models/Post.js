const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  position: String,
  body: String,
  username: String,
  company: String,
  mailto: String,
  createdAt: String,
  startup: {
    type: Schema.Types.ObjectId,
    ref: 'startups',
  },
});

module.exports = model('Post', postSchema);

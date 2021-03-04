const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  position: String,
  body: String,
  username: String,
  mailto: String,
  company: String,
  imageUrl: String,
  industry: String,
  location: String,
  growthStage: String,
  fundingStage: String,
  createdAt: String,
  startup: {
    type: Schema.Types.ObjectId,
    ref: 'startups',
  },
});

module.exports = model('Post', postSchema);

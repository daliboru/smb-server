const { model, Schema } = require('mongoose');

const startupSchema = new Schema({
  username: String,
  password: String,
  company: String,
  email: String,
  createdAt: String,
  imageUrl: String,
  industry: String,
  location: String,
  growthStage: String,
  fundingStage: String,
});

module.exports = model('Startup', startupSchema);

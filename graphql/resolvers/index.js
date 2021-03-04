const postsResolvers = require('./posts');
const startupsResolvers = require('./startups');

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...startupsResolvers.Query,
  },
  Mutation: {
    ...startupsResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};

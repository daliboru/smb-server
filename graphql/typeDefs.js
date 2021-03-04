const gql = require('graphql-tag');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    position: String!
    mailto: String!
    company: String!
    createdAt: String!
    imageUrl: String!
    industry: String!
    location: String!
    growthStage: String!
    fundingStage: String!
  }
  type Startup {
    id: ID!
    email: String!
    token: String!
    company: String!
    imageUrl: String!
    industry: String!
    location: String!
    growthStage: String!
    fundingStage: String!
    createdAt: String!
  }
  input startupRegisterInput {
    email: String!
    company: String!
    password: String!
    confirmPassword: String!
    imageUrl: String!
    industry: String!
    location: String!
    growthStage: String!
    fundingStage: String!
  }
  input filterInput {
    company: String
    industry: String
    location: String
    growthStage: String
    fundingStage: String
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getStartups(filter: filterInput): [Startup]
    getStartup(startupId: ID!): Startup
  }
  type Mutation {
    startupRegister(startupRegisterInput: startupRegisterInput): Startup!
    startupLogin(email: String!, password: String!): Startup!
    createPost(body: String!, position: String!, mailto: String!): Post!
    deletePost(postId: ID!): String!
  }
`;

const gql = require('graphql-tag');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    position: String!
    company: String!
    createdAt: String!
    username: String!
    mailto: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    company: String!
    username: String!
    createdAt: String!
  }
  input registerInput {
    username: String!
    email: String!
    company: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: registerInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!, position: String!, mailto: String!): Post!
    deletePost(postId: ID!): String!
  }
`;

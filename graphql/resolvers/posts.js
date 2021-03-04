const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        return await Post.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body, position, mailto }, context) {
      const startup = checkAuth(context);
      if (position.trim() === '') {
        throw new Error('Position must not be empty');
      }
      if (body.trim() === '') {
        throw new Error('Body must not be empty');
      }
      if (mailto.trim() === '') {
        throw new Error('Email must not be empty');
      } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!mailto.match(regEx)) {
          throw new Error('Email must be a valid email address');
        }
      }

      const newPost = new Post({
        body,
        position,
        mailto,
        startup: startup.id,
        company: startup.company,
        imageUrl: startup.imageUrl,
        industry: startup.industry,
        location: startup.location,
        growthStage: startup.growthStage,
        fundingStage: startup.fundingStage,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const startup = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (startup.email === post.email) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators');

module.exports = {
  Mutation: {
    // *********************************LOGIN*********************************************************************************
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          company: user.company,
          username: user.username,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    // *************************REGISTER********************************************************************************
    async register(
      _,
      { registerInput: { username, password, email, company, confirmPassword } }
    ) {
      // validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        company,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // make sure user is unique
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }
      // hash pass and create an auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        company,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
          company: res.company,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

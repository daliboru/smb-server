const Startup = require('../../models/Startup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
  validateStartupRegisterInput,
  validateStartupLoginInput,
} = require('../../utils/validators');

module.exports = {
  Query: {
    async getStartups(_, { filter }) {
      try {
        if (filter) {
          return await Startup.find(filter);
        } else {
          return await Startup.find().sort({ createdAt: -1 });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getStartup(_, { startupId }) {
      try {
        const startup = await Startup.findById(startupId);
        if (startup) {
          return startup;
        } else {
          throw new Error('Startup not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async startupLogin(_, { email, password }) {
      const { errors, valid } = validateStartupLoginInput(email, password);
      const startup = await Startup.findOne({ email });

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      if (!startup) {
        errors.general = 'Startup not found';
        throw new UserInputError('Startup not found', { errors });
      }
      const match = await bcrypt.compare(password, startup.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = jwt.sign(
        {
          id: startup.id,
          email: startup.email,
          company: startup.company,
          industry: startup.industry,
          growthStage: startup.growthStage,
          location: startup.location,
          imageUrl: startup.imageUrl,
          fundingStage: startup.fundingStage,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );

      return {
        ...startup._doc,
        id: startup._id,
        token,
      };
    },
    async startupRegister(
      _,
      {
        startupRegisterInput: {
          password,
          email,
          company,
          confirmPassword,
          industry,
          growthStage,
          location,
          imageUrl,
          fundingStage,
        },
      }
    ) {
      // validate user data
      const { valid, errors } = validateStartupRegisterInput(
        email,
        company,
        password,
        confirmPassword,
        industry,
        growthStage,
        location,
        imageUrl,
        fundingStage
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // make sure user is unique
      const startup = await Startup.findOne({ email });
      if (startup) {
        throw new UserInputError('Email is taken', {
          errors: {
            email: 'This email is taken',
          },
        });
      }
      // hash pass and create an auth token
      password = await bcrypt.hash(password, 12);
      const newStartup = new Startup({
        email,
        company,
        password,
        createdAt: new Date().toISOString(),
        industry,
        growthStage,
        location,
        imageUrl,
        fundingStage,
      });

      const res = await newStartup.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
          company: res.company,
          industry: res.industry,
          growthStage: res.growthStage,
          location: res.location,
          imageUrl: res.imageUrl,
          fundingStage: res.fundingStage,
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

const { AuthenticationError } = require('apollo-server-express');
const { User, Destination } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
   
      return User.find().populate('destinations');
    },
    user: async (_, { username }) => {
     
      return User.findOne({ username }).populate('destinations');
    },
    destinations: async () => {
   
      return Destination.find({});
    },
    destination: async (_, { destinationId }) => {
  
      return Destination.findById(destinationId);
    },
    me: async (_, __, context) => {
    
      if (context.user) {
        return User.findById(context.user._id).populate('destinations');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
  
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addDestination: async (_, { location, departure }, context) => {
      if (context.user) {
        const destination = await Destination.create({
          location,
          departure,
        });
        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { destinations: destination._id },
        });
        return destination;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeDestination: async (_, { destinationId }, context) => {

      if (context.user) {
        const destination = await Destination.findByIdAndDelete(destinationId);
        await User.findByIdAndUpdate(context.user._id, {
          $pull: { destinations: destination._id },
        });

        return destination;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateDestination: async (_, { destinationId, location, departure }, context) => {

      if (context.user) {
        const destination = await Destination.findByIdAndUpdate(
          destinationId,
          { $set: { location, departure } },
          { new: true }
        );
        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { destinations: destination._id },
        });
        return destination;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;


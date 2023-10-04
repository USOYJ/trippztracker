const { Schema, model } = require('mongoose');

const destinationSchema = new Schema({
  presentLocation: {
    type: String,
    required: 'Pick a location!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  }
});

const Destination = model('Destination', destinationSchema);

module.exports = Destination;
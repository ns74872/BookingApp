const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  addedPhotos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number,
});

const PlaceModel = mongoose.model('place', placeSchema);

module.exports = PlaceModel;

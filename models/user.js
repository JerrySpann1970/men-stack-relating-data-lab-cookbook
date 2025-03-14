const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodItem: {
    type: String,
    required: true,
  },
  packageSize: {
    type: String,
    required: true,
  },
  notes: {
    type: String,  
  },
  purchaseLink: {
    type: String,
  },
  storageMethod: {
    type: String,
    enum: ['pantry', 'refrigerate', 'freeze', 'garagePantry'],
  }, 
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  foods: [foodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

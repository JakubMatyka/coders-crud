const mongoose = require('mongoose');

// Define our book schema
const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Export the Mongoose model
module.exports = mongoose.model('Book', BookSchema);
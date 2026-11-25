// Load mongoose (the tool that talks to MongoDB)
const mongoose = require('mongoose');

// Schema = blueprint. It lists the fields a book has and their rules.
const bookSchema = new mongoose.Schema({
  // Text, and it must be provided
  title: { type: String, required: [true, 'Title is required'] },

  // Text, and it must be provided
  author: { type: String, required: [true, 'Author is required'] },

  // Text, and no two books can have the same isbn
  isbn: { type: String, unique: true },

  // A date, such as "1965-08-01"
  publishedDate: { type: Date },

  // true or false. If not sent, it becomes true.
  inStock: { type: Boolean, default: true },
});

// Turn the blueprint into a model named "Book".
// The model gives us methods: create(), find(), findById(), and more.
// MongoDB stores the books in a collection called "books".
module.exports = mongoose.model('Book', bookSchema);

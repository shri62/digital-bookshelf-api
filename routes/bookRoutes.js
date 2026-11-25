// Load the tools we need
const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book'); // our Book model

// A router holds a group of routes
const router = express.Router();

// Checks that an id looks like a real MongoDB id
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE a book: POST /api/books
router.post('/', async (req, res) => {
  try {
    // req.body = the JSON sent from Postman
    const book = await Book.create(req.body);
    res.status(201).json(book); // 201 = created
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 = bad data
  }
});

// READ ALL books: GET /api/books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // find() with no filter = everything
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message }); // 500 = server error
  }
});

// READ ONE book: GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    // req.params.id = the id written in the URL
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' }); // 404 = not found
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a book: PUT /api/books/:id
router.put('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // give back the updated book
      runValidators: true, // apply the schema rules
    });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a book: DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Share the router so server.js can use it
module.exports = router;

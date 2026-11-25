require('dotenv').config();                       // load .env first
const express = require('express');
const connectDB = require('./db/connection');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();                                      // connect to MongoDB

app.use(express.json());                          // parse JSON request bodies
app.use('/api/books', bookRoutes);                // mount the book routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

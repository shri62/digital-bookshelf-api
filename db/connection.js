// Load the mongoose package (it talks to MongoDB for us)
const mongoose = require('mongoose');

// A function that connects to the database
// "async" lets us use "await" inside, to wait for slow tasks
const connectDB = async () => {
  // try: run this code, and if something fails, jump to catch
  try {
    // Connect using the address stored in the .env file
    // "await" waits until the connection is finished
    await mongoose.connect(process.env.MONGO_URI);

    // Print this message if the connection worked
    console.log('MongoDB connected');
  } catch (err) {
    // This runs only if the connection failed
    // err.message tells us why (wrong password, no network, etc.)
    console.error('Connection error:', err.message);

    // Stop the app, because it can't work without the database
    process.exit(1);
  }
};

// Share this function so server.js can import and use it
module.exports = connectDB;

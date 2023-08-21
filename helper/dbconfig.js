const mongoose = require('mongoose');

// Replace 'your_connection_string' with your actual MongoDB Atlas connection string

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
      const connectionString = process.env.MONGODB_URI ;
    mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;

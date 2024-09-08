 
const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      bufferCommands: true, // Disable command buffering
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new server discovery and monitoring engine
      serverSelectionTimeoutMS: 30000, // Timeout in milliseconds for server selection
    });
    console.log("Database connected:", mongoose.connection.host);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

module.exports = connectDb;

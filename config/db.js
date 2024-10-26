const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Mongo Database connection successful");
  } catch (err) {
    console.log(`Mongo Database connection error: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;

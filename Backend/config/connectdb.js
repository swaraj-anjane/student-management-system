


const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("database connected successfully");
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
}

module.exports = connectDatabase;
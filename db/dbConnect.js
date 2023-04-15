const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  //use mongoose to connect this app using the DB_URL
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      /* useCreateIndex: true, */
    });
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;

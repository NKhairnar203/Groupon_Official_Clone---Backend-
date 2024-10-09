const mongoose = require("mongoose");

const Database = () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("mongoDb Database connected...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = Database;

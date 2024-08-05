const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "test",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = connect;

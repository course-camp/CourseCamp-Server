const mongoose = require("mongoose");
const config = require("../config/config");

function connect() {
  mongoose
    .connect(config.db.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Mongodb connection established."))
    .catch((error) =>
      console.log(
        "Failed to establish initial connection with mongodb." + error
      )
    );

  const con = mongoose.connection;
  con.on("error", onError);
  con.on("disconnected", onDisconnected);
  con.on("reconnected", onReconnected);

  process.on("SIGINT", () => {
    con.close(() => {
      console.log("Mongodb connection closed due to SIGINT signal event");
      process.exit();
    });
  });
}

function onError(error) {
  console.log("Failed to reconnected or some error occurred. " + error);
}
function onDisconnected() {
  console.log("Connection lost with mongoDB database");
}
function onReconnected() {
  console.log("MongoDB successfully reconnected back again.");
}

module.exports = connect;

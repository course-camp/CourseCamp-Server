const { HTTPError, HTTP500Error } = require("./error");
const mongoose = require("mongoose");
class ErrorHandler {
  static handleError(err, res) {
    if (err instanceof mongoose.Error) {
      err = new HTTP500Error();
      delete err.message;
    }
    if (err instanceof HTTPError && err.isOperational) {
      delete err.isOperational;
      delete err.name;
      delete err.stack;
      if (err.statusCode >= 500) {
        // TODO: log error and send error events.
        delete err.message;
      }

      return res.status(err.statusCode).send(err);
    }

    //TODO: log error and send error events.
    //TODO: exit process
    console.log(err);
  }
}

module.exports = ErrorHandler;

const { HTTPError, HTTP500Error, HTTP400Error } = require("./error");
const mongoose = require("mongoose");
const { MulterError } = require("multer");
const axios = require("axios").default;

class ErrorHandler {
  static handleError(err, res) {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      err = new HTTP400Error("Invalid JSON format.");
    }
    if (err instanceof mongoose.Error || axios.isAxiosError(err)) {
      //TODO: log errors
      err = new HTTP500Error();
      delete err.message;
    }
    if (err instanceof MulterError) {
      err = new HTTP400Error("Bad request paramters.");
    }
    if (err instanceof HTTPError && err.isOperational) {
      delete err.isOperational;
      delete err.name;
      delete err.stack;
      if (err.statusCode >= 500) {
        // TODO: log error and send error events.
        delete err.message;
      }
      if (err.hasOwnProperty("storageErrors")) delete err.storageErrors;

      return res.status(err.statusCode).send(err);
    }

    //TODO: log error and send error events.
    //TODO: exit process
    console.log(err);
  }
}

module.exports = ErrorHandler;

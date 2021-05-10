const ErrorHandler = require("../helpers/ErrorHandler");
const error = function (err, req, res, next) {
  ErrorHandler.handleError(err, res);
};

module.exports = error;

const HTTPError = require("./HTTPError");
const { statusCode, status } = require("../../config/httpContants");
class HTTP409Error extends HTTPError {
  constructor(message) {
    super(message, statusCode.CONFLICT, status.CONFLICT, true);
  }
}

module.exports = HTTP409Error;

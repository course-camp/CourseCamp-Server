const HTTPError = require("./HTTPError");
const { statusCode, status } = require("../../config/httpContants");
class HTTP404Error extends HTTPError {
  constructor(message) {
    super(message, statusCode.NOT_FOUND, status.NOT_FOUND, true);
  }
}

module.exports = HTTP404Error;

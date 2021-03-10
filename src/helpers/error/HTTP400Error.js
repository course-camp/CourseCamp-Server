const HTTPError = require("./HTTPError");
const { statusCode, status } = require("../../config/httpContants");
class HTTP400Error extends HTTPError {
  constructor(message) {
    super(message, statusCode.BAD_REQUEST, status.BAD_REQUEST, true);
  }
}

module.exports = HTTP400Error;

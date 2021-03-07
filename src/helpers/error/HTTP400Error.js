const APPError = require("./APPError");
const { statusCode, status } = require("../../config/error");
class HTTP400Error extends APPError {
  constructor(message) {
    super(message, statusCode.BAD_REQUEST, status.BAD_REQUEST, true);
  }
}

module.exports = HTTP400Error;

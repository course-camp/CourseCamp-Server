const APPError = require("./APPError");
const { statusCode, status } = require("../../config/error");
class HTTP404Error extends APPError {
  constructor(message) {
    super(message, statusCode.NOT_FOUND, status.NOT_FOUND, true);
  }
}

module.exports = HTTP404Error;

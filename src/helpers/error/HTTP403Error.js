const APPError = require("./APPError");
const { statusCode, status } = require("../../config/error");
class HTTP403Error extends APPError {
  constructor(message) {
    super(message, statusCode.FORBIDDEN, status.FORBIDDEN, true);
  }
}
module.exports = HTTP403Error;

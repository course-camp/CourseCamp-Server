const APPError = require("./APPError");
const { statusCode, status } = require("../../config/error");
class HTTP401Error extends APPError {
  constructor(message) {
    super(message, statusCode.UNAUTHORIZED, status.UNAUTHORIZED, true);
  }
}
module.exports = HTTP401Error;

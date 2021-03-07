const APPError = require("./APPError");
const { statusCode, status } = require("../../config/error");
class HTTP500Error extends APPError {
  constructor(message) {
    super(
      message,
      statusCode.INTERNAL_SERVER_ERROR,
      status.INTERNAL_SERVER_ERROR,
      true
    );
  }
}
module.exports = HTTP500Error;

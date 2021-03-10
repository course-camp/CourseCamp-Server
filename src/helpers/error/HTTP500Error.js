const HTTPError = require("./HTTPError");
const { statusCode, status } = require("../../config/httpContants");
class HTTP500Error extends HTTPError {
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

const HTTPError = require("./HTTPError");
const { statusCode, status } = require("../../config/httpContants");
class HTTP422Error extends HTTPError {
  constructor(message) {
    super(
      message,
      statusCode.UNPROCESSABLE_ENTITY,
      status.UNPROCESSABLE_ENTITY,
      true
    );
  }
}

module.exports = HTTP422Error;

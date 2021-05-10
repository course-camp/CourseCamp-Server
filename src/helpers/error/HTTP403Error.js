const HTTPError = require("./HTTPError");
const { statusCode, status } = require("../../config/httpContants");
class HTTP403Error extends HTTPError {
  constructor(message) {
    super(message, statusCode.FORBIDDEN, status.FORBIDDEN, true);
  }
}
module.exports = HTTP403Error;

const HTTPError = require("./HTTPError");
const { statusCode, status } = require("../../config/httpContants");
class HTTP401Error extends HTTPError {
  constructor(message) {
    super(message, statusCode.UNAUTHORIZED, status.UNAUTHORIZED, true);
  }
}
module.exports = HTTP401Error;

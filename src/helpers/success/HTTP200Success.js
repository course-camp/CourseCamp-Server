const HTTPSuccess = require("./HTTPSuccess");
const { statusCode, status } = require("../../config/httpContants");

class HTTP200Success extends HTTPSuccess {
  constructor(message, data) {
    super(message, statusCode.OK, status.OK, data);
  }
}

module.exports = HTTP200Success;

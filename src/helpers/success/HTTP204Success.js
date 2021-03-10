const HTTPSuccess = require("./HTTPSuccess");
const { statusCode, status } = require("../../config/httpContants");

class HTTP204Success extends HTTPSuccess {
  constructor(message) {
    super(message, statusCode.NO_CONTENT, status.NO_CONTENT, {});
  }
}

module.exports = HTTP204Success;

const HTTPSuccess = require("./HTTPSuccess");
const { statusCode, status } = require("../../config/httpContants");

class HTTP201Success extends HTTPSuccess {
  constructor(message, data) {
    super(message, statusCode.CREATED, status.CREATED, data);
  }
}

module.exports = HTTP201Success;

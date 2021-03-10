class HTTPSuccess {
  constructor(message, statusCode, status, data) {
    this.statusCode = statusCode;
    this.status = status;
    this.result = "SUCCESS";
    this.message = message;
    this.data = data;
  }

  sendResponse(res) {
    res.status(this.statusCode).json(this);
  }
}

module.exports = HTTPSuccess;

class APPError extends Error {
  constructor(message, statusCode, status, isOperational = true) {
    super();
    this.statusCode = statusCode;
    this.name = "APIError";
    this.status = status;
    this.message = message;
    this.result = "FAILURE";
    this.isOperational = isOperational;
  }
}

module.exports = APPError;

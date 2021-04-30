const { httpStatusCodes } = require('../constants');
const baseError = require('./baseError');

class UnauthorizedError extends baseError {
  constructor(
    name,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = 'User Unauthorized',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = UnauthorizedError;

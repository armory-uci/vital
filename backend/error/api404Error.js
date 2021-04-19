const { httpStatusCodes } = require('../constants');
const baseError = require('./baseError');

class Api404Error extends baseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = Api404Error;

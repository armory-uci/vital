// references: https://sematext.com/blog/node-js-error-handling/
// https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7

const baseError = require('../error/baseError');

const errorHandler = (err, req, res, next) => {
  // NOTE: not opting for a logger as the project is not gonna persist log anywhere, as this is a demo academic project.
  // if need for a logger arise reference https://stackify.com/winston-logging-tutorial/
  console.error(err);
  switch (true) {
    case typeof err === 'string':
      // custom application error
      const is404 = err.toLowerCase().endsWith('not found');
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ message: err });
    case err instanceof baseError && err.isOperational && !!err.statusCode:
      return res.status(err.statusCode).json(err);
    default:
      return res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;

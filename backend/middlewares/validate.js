// reference https://jasonwatmore.com/post/2020/05/13/node-mongo-api-with-email-sign-up-verification-authentication-forgot-password#accounts-controller-js
// for validations when need arises.
const validateRequest = (req, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  // NOTE: we don't merge req.params as it's handled by routes matching
  const data = { ...req.body, ...req.query };
  const { error, value } = schema.validate(data, options);
  if (error) {
    next(
      `request validation error:
      ${error.details.map((x) => x.message).join(', ')}`
    );
  } else {
    req.body = value;
    next();
  }
};

const validateResponse = (req, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  // NOTE: we don't merge req.params as it's handled by routes matching
  const data = { ...req.body, ...req.query };
  const { error, value } = schema.validate(data, options);
  if (error) {
    next(
      `response validation error:
      ${error.details.map((x) => x.message).join(', ')}`
    );
  } else {
    req.body = value;
    next();
  }
};

module.exports = {
  validateRequest,
  validateResponse
};

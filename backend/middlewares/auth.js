const unauthorizedError = require('../error/unauthorizedError');
const { admin } = require('../db/admin');

const validateIdToken = async (req, res, next) => {
  try {
    // TODO: only allow req.query in backend development.
    const idtoken = req.body.idtoken || req.query.idtoken;
    if (!idtoken) throw new unauthorizedError('empty req body');

    const decodedToken = await admin.auth().verifyIdToken(idtoken);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateIdToken
};

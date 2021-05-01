// https://stackoverflow.com/a/48686516
// see above for the need of this file.

const admin = require('firebase-admin');
admin.initializeApp();

module.exports.admin = admin;

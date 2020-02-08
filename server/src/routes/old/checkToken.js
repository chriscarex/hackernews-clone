/**
 * checkToken.js is the method related to the /check-token endpoint - used for validating a token when the user access a private page on the client
 * @param {string} token the user token as authorization header
 * @returns {object} if success, { success: true }, else {success: false} + message
 */
var RoutesCheckToken; //for docs purposes

var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var verifyToken = require("../utils/verifyToken").verifyToken;

module.exports = {
  checkToken: function(req, res) {
    //record access to endpoint
    recordAccess(req);
    addCorsHeaders(res);

    var authHeader = req.headers.authorization;

    //check if token is valid
    if (authHeader) {
      var isValidated = verifyToken(authHeader);
      var responseMessage =
        isValidated === true ? null : "Token not valid. Please sign in again.";

      return res.send({ success: isValidated, message: responseMessage });
    } else {
      return res.send({ success: false });
    }
  }
};

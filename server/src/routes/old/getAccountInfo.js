/**
 * getAccountInfo.js is the method related to the /get-account-inf0 endpoint - used for getting current user info
 * @param {string} token the user token as authorization header
 * @returns {object} if success, { success: true }, else {success: false} + message
 */
var RoutesGetAccountInfo; //for docs purposes

var request = require("request");
var config = require("../config");
var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var verifyToken = require("../utils/verifyToken").verifyToken;
var mysql = require("mysql");

module.exports = {
  getAccountInfo: function(req, res) {
    var response = res;
    recordAccess(req);
    addCorsHeaders(res);

    var authHeader = req.headers.authorization;

    //connect to db
    var connection = mysql.createConnection({
      host: config.mysql.host,
      user: config.mysql.user,
      port: config.mysql.port,
      password: config.mysql.password,
      database: config.mysql.database,
      tableUsers: config.mysql.tableUsers
    });

    connection.connect(function(err) {
      if (err) {
        response.json({
          success: false,
          message: "Could not connect to database. Please try again later."
        });
        return;
      }

      //check if token is valid
      var isValidated = verifyToken(authHeader);

      //if it's valid, get user id and check if id exists
      if (isValidated) {
        //user info from first part of JWT headerless token
        var decodedTokenParameters = Buffer.from(
          authHeader.split(".")[0],
          "base64"
        );

        var userId = JSON.parse(decodedTokenParameters).id;

        connection.query(
          "SELECT email, role, planExpirationDate, lastAccess, registrationDate  FROM " +
            config.mysql.tableUsers +
            " WHERE `id` = ?",
          [userId],
          (err, result) => {
            if (result === null || result.length === 0 || err) {
              response.json({
                success: false,
                message:
                  "User not found or could not connect to database. Please try again later."
              });
            } else {
              //if userid exists, activate account
              response.json({
                success: true,
                info: {
                  email: result[0].email,
                  role: result[0].role,
                  planExpirationDate: result[0].planExpirationDate,
                  lastAccess: result[0].lastAccess,
                  registrationDate: result[0].registrationDate
                }
              });
            }
          }
        );
      } else {
        response.json({
          success: false,
          message: "Token has expired."
        });
      }
    });

    return false;
  }
};

/**
 * deleteAccount.js is the method related to the /delete-account endpoint - used for deleting an account
 * @param {string} token the user token as authorization header
 * @returns {object} if success, { success: true }, else {success: false} + message
 */
var RoutesDeleteAccount; //for docs purposes

var request = require("request");
var config = require("../config");
var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var verifyToken = require("../utils/verifyToken").verifyToken;
var mysql = require("mysql");
var uuidv1 = require("uuid/v1");
var config = require("../config.js");

module.exports = {
  deleteAccount: function(req, res) {
    var response = res;
    recordAccess(req);
    addCorsHeaders(res);

    var authHeader = req.headers.authorization;

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
          "SELECT email, deleteAccount FROM " +
            config.mysql.tableUsers +
            " WHERE `id` = ?",
          [userId],
          (err2, result, fields) => {
            if (result === null || err) {
              response.json({
                success: false,
                message:
                  "User  does not exists or could not connect to database. Please try again later or contact us."
              });
              return false;
            }
            if (result[0].deleteAccount === 1) {
              response.json({
                success: false,
                message: "Account already deleted. Please login."
              });
            } else {
              connection.query(
                "UPDATE " +
                  config.mysql.tableUsers +
                  " SET deleteAccount = 1  WHERE `id` = ?",
                [userId],
                (errUpdate, resultUpdate, fieldsUpdate) => {
                  response.json({
                    success: true
                  });
                }
              );
            }
          }
        );
      } else {
        response.json({
          success: false,
          message:
            "Token has expired. Please click on Resend activation email to obtain a new activation email or contact us."
        });
      }
    });
    return false;
  }
};

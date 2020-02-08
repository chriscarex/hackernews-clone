/**
 * resetPassword.js is the method related to the /reset-password endpoint - used for resetting the user password
 * @param {string} password the new user password
 * @param {string} token the user token
 * @returns {object} if success, { success: true }, else {success: false} + message
 */
var RoutesResetPassword; //for docs purposes

var mysql = require("mysql");
var nodeMailer = require("nodemailer");
var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var config = require("../config.js");
var bcrypt = require("bcrypt");
var verifyToken = require("../utils/verifyToken").verifyToken;

module.exports = {
  resetPassword: function(req, res) {
    var response = res;
    recordAccess(req);
    addCorsHeaders(res);

    var userPassword = req.body.password;
    var authHeader = req.headers.authorization;

    //check if password is more than 12 characters & contains at least one number, one capital letter and one lowercase letter
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g;
    if (
      passwordRegex.test(userPassword) === false ||
      userPassword.length < 12
    ) {
      response.json({
        success: false,
        message:
          "Password should be at least 12 character long and contain at least one number, one lowercase and one Uppercase character."
      });
      return false;
    }

    //connect to db
    var connection = mysql.createConnection({
      host: config.mysql.host,
      user: config.mysql.user,
      port: config.mysql.port,
      password: config.mysql.password,
      database: config.mysql.database,
      tableUsers: config.mysql.tableUsers
    });

    connection.connect(function(errGeneral) {
      if (errGeneral) {
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
          "SELECT id  FROM " + config.mysql.tableUsers + " WHERE `id` = ?",
          [userId],
          (err, result) => {
            if (result === null || result.length === 0 || err) {
              response.json({
                success: false,
                message:
                  "Invalid token. Please click on Forgot Password or contact us."
              });
            } else {
              var newPassword = bcrypt.hashSync(
                userPassword + config.classicAuth.secret,
                10
              );

              connection.query(
                "UPDATE " +
                  config.mysql.tableUsers +
                  " SET password = ? WHERE `id` = ?",
                [newPassword, userId],
                (errUpdate, resultUpdate) => {
                  if (errUpdate) {
                    response.json({
                      success: false,
                      message:
                        "Could not update your password. Please try again later."
                    });

                    return;
                  }

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
            "Invalid token. Please request another password reset link or contact us."
        });
      }
    });

    return false;
  }
};

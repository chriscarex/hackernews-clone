/**
 * sendPasswordResetEmail.js is the method related to the /send-password-reset-email endpoint - used for sending a new password reset email to the user
 * @param {string} email the user emall
 + @returns {object} if success, { success: true }, else {success: false} + message
 */
var RoutesSendPasswordResetEmail; //for docs purposes

var mysql = require("mysql");
var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var config = require("../config.js");
var getEmailParameters = require("../utils/getEmailParameters")
  .getEmailParameters;

module.exports = {
  sendPasswordResetEmail: function(req, res) {
    var response = res;

    //record access to endpoint
    recordAccess(req);
    addCorsHeaders(res);

    var userEmail = req.body.email;

    //check if email is valid
    var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    if (emailRegex.test(userEmail) === false) {
      response.json({
        success: false,
        message: "Please insert a valid email and try again."
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

      connection.query(
        "SELECT id, isActivated, deleteAccount FROM " +
          config.mysql.tableUsers +
          " WHERE `email` = ?",
        [userEmail],
        (err, result) => {
          if (err) {
            response.json({
              success: false,
              message: "Could not connect to database. Please try again later."
            });

            return false;
          }

          if (result && result.length > 0) {
            if (result[0].deleteAccount === true) {
              response.json({
                success: false,
                message:
                  "Account deleted. Please login to reactivate it or contact us."
              });

              return false;
            } else {
              if (result[0].isActivated === 0) {
                response.json({
                  success: false,
                  message:
                    "Account not activated. Please activate your account first or contact us."
                });

                return false;
              } else {
                //send activation email
                var emailParameters = getEmailParameters(
                  userEmail,
                  result[0].id,
                  "resetPassword"
                );

                //send email and wait for result
                emailParameters.sender.sendMail(
                  emailParameters.options,
                  (errorEmail, info) => {
                    if (errorEmail) {
                      response.json({
                        success: false,
                        message:
                          "We could not send you a reset password link via email. Please try again or contact us."
                      });

                      return false;
                    }

                    response.json({
                      //user: user,
                      success: true
                    });
                    return false;
                  }
                );

                return false;
              }
            }
          } else {
            response.json({
              success: false,
              message:
                "Account not found. Please try again later or contact us."
            });
          }
        }
      );
    });

    return false;
  }
};

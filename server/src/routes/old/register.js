/**
 * register.js is the method related to the /register endpoint - used for user register
 * @param {string} email the user emall (Required for email validation and updates
 * @param {string} password the user password (saved on the db as SHA-256)
 * @returns {object} if success, { success: true }, else {success: false, message: 'An error message'}
 */
var RoutesRegister; //for docs purposes

var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
// var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var config = require("../config.js");
var getEmailParameters = require("../utils/getEmailParameters")
  .getEmailParameters;
// var User = require("../models/userModel");
var mysql = require("mysql");
var uuidv1 = require("uuid/v1");

module.exports = {
  register: function(req, res) {
    var response = res;

    //record access to endpoint
    recordAccess(req);
    addCorsHeaders(res);

    var userEmail = req.body.email;
    var userPassword = req.body.password;

    //check if email is valid
    var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    if (emailRegex.test(userEmail) === false) {
      response.json({
        success: false,
        message: "Please insert a valid email and try again."
      });
      return false;
    }

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

    connection.connect(function(err) {
      if (err) {
        response.json({
          success: false,
          message: "Could not connect to database. Please try again later."
        });
        return;
      }

      //add dates to add to sql queries
      var currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      var expirationDate = "2049-06-22 05:40:06";

      connection.query(
        "SELECT id, deleteAccount FROM " +
          config.mysql.tableUsers +
          " WHERE `email` = ?",
        [userEmail],
        (err2, result) => {
          if (err2) {
            response.json({
              success: false,
              message: "Could not connect to database. Please try again later."
            });

            return false;
          }

          if (result && result.length > 0) {
            if (result[0].deleteAccount != 1) {
              response.json({
                success: false,
                message: "User already exists. Please login."
              });

              return false;
            } else {
              connection.query(
                "UPDATE " +
                  config.mysql.tableUsers +
                  " SET isActivated = 0, lastAccess = '" +
                  currentDate +
                  "', accessTimes = 0, role='user-1', planExpirationDate = '" +
                  currentDate +
                  "', deleteAccount = 0, accountDeletedDate = '" +
                  expirationDate +
                  "' WHERE `id` = ?",
                [result[0].id],
                (errUpdate, resultUpdate) => {
                  if (errUpdate) {
                    response.json({
                      success: false,
                      message:
                        "Could not connect to database. Please try again later."
                    });
                  }

                  var emailParameters = getEmailParameters(
                    userEmail,
                    result[0].id,
                    "emailActivation"
                  );

                  //send email and wait for result
                  emailParameters.sender.sendMail(
                    emailParameters.options,
                    (error, info) => {
                      if (error) {
                        response.json({
                          success: false,
                          message:
                            "User added but we could not send you an activation email. Please click on Resend activation email or contact us."
                        });
                      } else {
                        response.json({
                          success: true
                        });
                      }

                      return false;
                    }
                  );

                  return false;
                }
              );
            }
          } else {
            //add user to db as it does not exist in db
            var userId = uuidv1();
            var hashPassword = bcrypt.hashSync(
              userPassword + config.classicAuth.secret,
              10
            );

            connection.query(
              "INSERT INTO " +
                config.mysql.tableUsers +
                " SET id = ?, email = ?, password = ?,  isActivated = 0, lastAccess = '" +
                currentDate +
                "', accessTimes = 0, role='user-1', planExpirationDate = '" +
                currentDate +
                "', registrationDate = '" +
                currentDate +
                "', deleteAccount = 0, accountDeletedDate = '" +
                expirationDate +
                "';",
              [userId, userEmail, hashPassword],
              (errInsert, resultInsert) => {
                if (errInsert) {
                  response.json({
                    success: false,
                    message:
                      "Could not connect to database. Please try again later."
                  });

                  return false;
                }

                var emailParameters = getEmailParameters(
                  userEmail,
                  userId,
                  "emailActivation"
                );

                //send email and wait for result
                emailParameters.sender.sendMail(
                  emailParameters.options,
                  (errorEmail, infoEmail) => {
                    if (errorEmail) {
                      response.json({
                        success: false,
                        message:
                          "User added but we could not send you an activation email. Please click on Resend activation email or contact us."
                      });
                    } else {
                      response.json({
                        success: true
                      });
                    }

                    return false;
                  }
                );

                return false;
              }
            );
          }
        }
      );
    });

    return false;
  }
};

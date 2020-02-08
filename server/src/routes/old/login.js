/**
 * login.js is the method related to the /login endpoint - used for user login
 * @param {string} email the user emall (Required for email validation and updates
 * @param {string} password the user password (saved on the db as SHA-256)
 * @returns {object} if success, { success: true } + jwt as header, else {success: false} + message
 */
var RoutesLogin; //for docs purposes
var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var signToken = require("../utils/signToken").signToken;
var mysql = require("mysql");
var uuidv1 = require("uuid/v1");
var config = require("../config.js");
var bcrypt = require("bcrypt");

module.exports = {
  login: function(req, res) {
    var response = res;

    //record access to endpoint
    recordAccess(req);
    addCorsHeaders(res);

    //var authHeader = req.headers.authorization;
    var userEmail = req.body.email;
    var userPassword = req.body.password;

    //connect to db;
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

      connection.query(
        "SELECT id, isActivated, password, isActivated, accessTimes, role, planExpirationDate, deleteAccount FROM " +
          config.mysql.tableUsers +
          " WHERE `email` = ?",
        [userEmail],
        (errSelect, result) => {
          if (errSelect) {
            response.json({
              success: false,
              message:
                "Could not connect to database. Please try again or contact us."
            });
            return false;
          }

          if (result === null || result.length === 0) {
            response.json({
              success: false,
              message:
                "Could not find this account in your database. Please register."
            });
            return false;
          } else {
            if (
              bcrypt.compareSync(
                userPassword + config.classicAuth.secret,
                result[0].password
              ) === false
            ) {
              response.json({
                success: false,
                message: "Wrong password. Please try again"
              });
              return false;
            }

            if (result[0].isActivated === false) {
              response.json({
                success: false,
                message: "Please activate your account before logging in."
              });
              return false;
            }

            var accessTimesCount = result[0].accessTimes + 1;
            var currentDate = new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");

            connection.query(
              "UPDATE " +
                config.mysql.tableUsers +
                " SET accessTimes = '" +
                accessTimesCount +
                "', lastAccess = '" +
                currentDate +
                "', deleteAccount = 0 WHERE `id` = ?",
              [result[0].id],
              (errUpdate, resultUpdate) => {
                // if (errUpdate) {
                //   response.json({
                //     success: false,
                //     message:
                //       "Could not connect to database. Please try again or contact us."
                //   });
                //   return false;
                // }

                var headerlessToken = signToken(
                  result[0].id,
                  result[0].role,
                  result[0].planExpirationDate,
                  24 * 30 //1 month
                );

                response.setHeader("x-auth-token", headerlessToken);
                response.json({
                  success: true
                });

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

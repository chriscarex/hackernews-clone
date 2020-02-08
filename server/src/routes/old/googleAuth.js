/**
 * googleAuth.js is the method related to the google Auth endpoint - used for logging in the user based through Google Oauth
 * @param {object} user the user info from Oauth
 * @returns {object} if success, { success: true }, else {success: false} + message
 */
var RoutesGoogleAuth; //for docs purposes

// var request = require("request");
// var requestPromise = require("request-promise-native");
var config = require("../config");
var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var signToken = require("../utils/signToken").signToken;
var bcrypt = require("bcrypt");
var uuidv1 = require("uuid/v1");
var mysql = require("mysql");

module.exports = {
  accessTokenRequest: function(req, res) {
    var response = res;

    recordAccess(req);
    addCorsHeaders(res);

    if (!req.user || !req.user.verified) {
      return res.send(401, "User Not Authenticated");
    }

    var headerlessToken = "";

    //check if user info exists
    if (req.user.email) {
      var userEmail = req.user.email;

      //connect to db;
      var connection = mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        port: config.mysql.port,
        password: config.mysql.password,
        database: config.mysql.database,
        tableUsers: config.mysql.tableUsers
      });

      //connect to db
      connection.connect(function(errGeneral) {
        if (errGeneral) {
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

        //check if email exists
        connection.query(
          "SELECT id, isActivated, accessTimes, role, planExpirationDate, deleteAccount FROM " +
            config.mysql.tableUsers +
            " WHERE `email` = ?",
          [userEmail],
          (err, result) => {
            if (err) {
              response.json({
                success: false,
                message:
                  "Could not connect to database. Please try again later."
              });

              return;
            }

            if (result && result.length > 0) {
              //generate token and update last access info
              var accessCount = result[0].accessTimes + 1;

              var deleteQuery = "";

              if (result[0].deleteAccount === 1) {
                deleteQuery = " deleteAccount = 0,";
              }

              var updateQuery =
                "UPDATE " +
                config.mysql.tableUsers +
                " SET isActivated = 1," +
                deleteQuery +
                " accessTimes = " +
                accessCount +
                ", lastAccess = '" +
                currentDate +
                "' WHERE `id` = ?";

              connection.query(
                updateQuery,
                [result[0].id],
                (errUpdate, resultUpdate) => {
                  if (errUpdate) {
                    response.json({
                      success: false,
                      message:
                        "Could not connect to database. Please try again later."
                    });

                    return;
                  }

                  connection.query(
                    "SELECT role, planExpirationDate FROM " +
                      config.mysql.tableUsers +
                      "  WHERE `id` = ?",
                    [result[0].id],
                    (errSelect2, resultSelect2) => {
                      if (
                        errSelect2 ||
                        resultSelect2 === null ||
                        resultSelect2.length === 0
                      ) {
                        response.json({
                          success: false,
                          message:
                            "Could not connect to database. Please try again later."
                        });

                        return;
                      }

                      headerlessToken = signToken(
                        result[0].id,
                        resultSelect2[0].role,
                        resultSelect2[0].planExpirationDate,
                        24 * 30 //1 month
                      );

                      response.setHeader("x-auth-token", headerlessToken);
                      response.json({
                        success: true
                      });
                    }
                  );

                  return;
                }
              );

              return;
            } else {
              //add user to db as it does not exist in db
              var userId = uuidv1();
              var hashPassword = bcrypt.hashSync(
                Math.random()
                  .toString(36)
                  .substring(2, 15) + config.classicAuth.secret,
                10
              );

              connection.query(
                "INSERT INTO " +
                  config.mysql.tableUsers +
                  " SET id = ?, email = ?, password = ?,  isActivated = 1, lastAccess = '" +
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

                    return;
                  }

                  headerlessToken = signToken(
                    userId,
                    "user-1",
                    expirationDate,
                    24 * 30 //1 month
                  );
                  response.setHeader("x-auth-token", headerlessToken);
                  response.json({
                    success: true
                  });

                  return;
                }
              );
            }
          }
        );
      });

      return;
    } else {
      response.json({
        success: false,
        message: "Please insert a valid email and try again."
      });
      return;
    }
  }
};

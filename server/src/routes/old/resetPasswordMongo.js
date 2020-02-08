/**
 * resetPassword.js is the method related to the /reset-password endpoint - used for resetting the user password
 * @param {string} password the new user password
 * @param {string} token the user token
 * @returns {object} if success, { success: true }, else {success: false} + message
 */
var RoutesResetPassword; //for docs purposes

var nodeMailer = require("nodemailer");
var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var mongoose = require("mongoose");
var config = require("../config.js");
var bcrypt = require("bcrypt");
var verifyToken = require("../utils/verifyToken").verifyToken;
var User = require("../models/userModel");

module.exports = {
  resetPassword: function(req, res) {
    var response = res;
    recordAccess(req);
    addCorsHeaders(res);

    var userPassword = req.body.password;
    var authHeader = req.headers.authorization;

    mongoose.connect(
      config.mongoDb.host + config.mongoDb.collection,
      { useNewUrlParser: true }
    );

    var db = mongoose.connection;
    db.on("error", () => {
      response.json({
        success: false,
        message: "Could not connect to database. Please try again later."
      });
    });

    db.once("open", () => {
      //check if token is valid
      var isValidated = verifyToken(authHeader);
      //if it's valid, get user id and check if id exists
      if (isValidated) {
        var decodedValue = Buffer.from(authHeader.split(".")[0], "base64");
        var userId = JSON.parse(decodedValue).id;

        User.find({ _id: userId }, { _id: 1 }, (err, result) => {
          if (result === null || err) {
            response.json({
              success: false,
              message:
                "Invalid token. Please click on Forgot Password or contact us."
            });

            return false;
          }

          // update password with new value
          User.updateOne(
            { _id: userId },
            {
              password: bcrypt.hashSync(
                userPassword + config.classicAuth.secret,
                10
              )
            },
            (err2, result2) => {
              response.json({
                success: true
              });
            }
          );
        });
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

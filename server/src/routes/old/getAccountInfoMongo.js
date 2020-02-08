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
var User = require("../models/userModel");
var mongoose = require("mongoose");

module.exports = {
  getAccountInfo: function(req, res) {
    var response = res;
    recordAccess(req);
    addCorsHeaders(res);

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
        //user info from first part of JWT headerless token
        var decodedTokenParameters = Buffer.from(
          authHeader.split(".")[0],
          "base64"
        );

        var userId = JSON.parse(decodedTokenParameters).id;

        User.findOne(
          { _id: userId },
          {
            email: 1,
            role: 1,
            planExpirationDate: 1,
            lastAccess: 1,
            registrationDate: 1
          },
          (err, result) => {
            if (result === null || err) {
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
                  email: result.email,
                  role: result.role,
                  planExpirationDate: result.planExpirationDate,
                  lastAccess: result.lastAccess,
                  registrationDate: result.registrationDate
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

    //check if token is valid

    //if token is valid, get id and check if user exists

    //if user exists, parse through info and update db

    return false;
  }
};

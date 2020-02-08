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
var mongoose = require("mongoose");
var config = require("../config.js");
var User = require("../models/userModel");

module.exports = {
  deleteAccount: function(req, res) {
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

      //if token is valid, remove user from db
      if (isValidated) {
        var decodedValue = Buffer.from(authHeader.split(".")[0], "base64");
        var userId = JSON.parse(decodedValue).id;

        //delete straight away
        // User.findOneAndDelete({ _id: userId }, (err, result) => {
        //   response.json({
        //     success: true
        //   });
        // });

        User.findOne(
          { _id: userId },
          { _id: 1, deleteAccount: 1 },
          (err, result) => {
            if (result === null || err) {
              response.json({
                success: false,
                message:
                  "User  does not exists or could not connect to database. Please try again later or contact us."
              });
            } else {
              if (result.deleteAccount === true) {
                response.json({
                  success: false,
                  message:
                    "Account already deleted. Please login if you want to reactivate your account or contacts us."
                });
              } else {
                //if userid exists, activate account
                User.updateOne(
                  { _id: userId },
                  {
                    deleteAccount: true,
                    accountDeletedDate: new Date(Date.now()).toISOString()
                  },
                  (err2, result2) => {
                    response.json({
                      success: true
                    });
                  }
                );
              }
            }
          }
        );
      } else {
        response.json({
          success: false,
          message: "Invalid token. Please sign in and try again or contact us."
        });
      }
    });

    return false;
  }
};

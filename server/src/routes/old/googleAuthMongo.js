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
var mongoose = require("mongoose");
var signToken = require("../utils/signToken").signToken;
var bcrypt = require("bcrypt");
var User = require("../models/userModel");

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
      //connect to db
      mongoose.connect(
        config.mongoDb.host + config.mongoDb.collection,
        { useNewUrlParser: true }
      );

      var db = mongoose.connection;

      //if error in connecting to db
      db.on("error", () => {
        response.json({
          success: false,
          message: "Could not connect to database. Please try again later."
        });
      });

      //if db connection works
      db.once("open", () => {
        //email messages
        User.findOne(
          { email: userEmail },
          {
            _id: 1,
            isActivated: 1,
            accessTimes: 1,
            role: 1,
            planExpirationDate: 1,
            deleteAccount: 1
          },
          (err, result) => {
            if (err) {
              response.json({
                success: false,
                message:
                  "Could not connect to database. Please try again later."
              });

              return false;
            }

            if (result) {
              //generate token and update last access info
              var updateQuery = {
                isActivated: true,
                $inc: { accessTimes: 1 },
                lastAccess: new Date(Date.now()).toISOString()
              };

              if (result.deleteAccount) {
                updateQuery = {
                  $set: {
                    isActivated: true,
                    lastAccess: new Date(Date.now()).toISOString(),
                    accessTimes: 0,
                    role: "user-1",
                    planExpirationDate: new Date(Date.now()).toISOString(),
                    deleteAccount: false,
                    accountDeletedDate: new Date("2049-12-31T11:59:59Z")
                  }
                };
              }

              User.updateOne(
                { email: userEmail },
                updateQuery,
                (err2, result2) => {
                  headerlessToken = signToken(
                    result._id,
                    result.role,
                    result.planExpirationDate,
                    24 * 30 //1 month
                  );
                  response.setHeader("x-auth-token", headerlessToken);
                  response.json({
                    success: true
                  });
                  return false;
                }
              );

              return false;
            } else {
              //add user to db as it does not exist in db
              let user = new User({
                email: userEmail,
                password: bcrypt.hashSync(
                  Math.random()
                    .toString(36)
                    .substring(2, 15) + config.classicAuth.secret,
                  10
                ),
                isActivated: true,
                accessTimes: 0,
                role: "user-1",
                planExpirationDate: new Date(Date.now()).toISOString(),
                deleteAccount: false,
                accountDeletedDate: new Date("2049-12-31T11:59:59Z")
              });

              // var newId = user._id;

              user
                .save()
                .then(savedUser => {
                  headerlessToken = signToken(
                    user._id,
                    user.role,
                    user.planExpirationDate,
                    24 * 30 //1 month
                  );
                  response.setHeader("x-auth-token", headerlessToken);
                  response.json({
                    success: true
                  });

                  return false;
                })
                .catch(err => {
                  response.json({
                    success: false,
                    message:
                      "Could not connect to database. Please try again later."
                  });

                  return false;
                });
            }
          }
        );
      });

      return false;
    }
  }
};

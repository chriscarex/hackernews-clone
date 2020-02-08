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
var mongoose = require("mongoose");
var config = require("../config.js");
var bcrypt = require("bcrypt");
var User = require("../models/userModel");

module.exports = {
  login: function(req, res) {
    var response = res;

    //record access to endpoint
    recordAccess(req);
    addCorsHeaders(res);

    //var authHeader = req.headers.authorization;
    var userEmail = req.body.email;
    var userPassword = req.body.password;

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

      return false;
    });

    //if db connection works
    db.once("open", () => {
      //check if email exists in db
      User.findOne(
        { email: userEmail },
        {
          _id: 1,
          email: 1,
          password: 1,
          isActivated: 1,
          lastAccess: 1,
          accessTimes: 1,
          role: 1,
          planExpirationDate: 1,
          registrationDate: 1,
          deleteAccount: 1
        },
        (err, result) => {
          if (err) {
            response.json({
              success: false,
              message:
                "Could not connect to database. Please try again or contact us."
            });
            return false;
          }

          if (result === null) {
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
                result.password
              ) === false
            ) {
              response.json({
                success: false,
                message: "Wrong password. Please try again"
              });
              return false;
            }

            if (result.isActivated === false) {
              response.json({
                success: false,
                message: "Please activate your account before logging in."
              });
              return false;
            }

            User.updateOne(
              { email: userEmail },
              {
                $inc: { accessTimes: 1 },
                lastAccess: new Date(Date.now()).toISOString(),
                deleteAccount: false
                //accountDeletedDate: new Date("2049-12-31T11:59:59Z")
              },
              (err2, result2) => {
                var headerlessToken = signToken(
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
          }
        }
      );
    });
    return false;
  }
};

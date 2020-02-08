/**
 * resendActivationEmail.js is the method related to the /resend-activation-email endpoint - used for sending a new activation email to the newly subscribed user
 * @param {string} email the user emall
 * @returns {object} if success, { success: true }, else {success: false} + message
 */
var RoutesResendActivationEmail;

var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var mongoose = require("mongoose");
var config = require("../config.js");
var getEmailParameters = require("../utils/getEmailParameters")
  .getEmailParameters;
var User = require("../models/userModel");

module.exports = {
  resendActivationEmail: function(req, res) {
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
        { _id: 1, isActivated: 1, deleteAccount: 1 },
        (err, result) => {
          if (err) {
            response.json({
              success: false,
              message: "Could not connect to database. Please try again later."
            });

            return false;
          }

          if (result) {
            if (result.deleteAccount === true) {
              response.json({
                success: false,
                message:
                  "Account deleted. Please login to reactivate it or contact us."
              });

              return false;
            } else {
              if (result.isActivated === true) {
                response.json({
                  success: false,
                  message: "Account already activated. Please login."
                });

                return false;
              } else {
                //send activation email
                var emailParameters = getEmailParameters(
                  userEmail,
                  result._id,
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
                          "We could not send you an activation email. Please try again or contact us."
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

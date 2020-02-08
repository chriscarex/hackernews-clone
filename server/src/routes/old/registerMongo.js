/**
 * register.js is the method related to the /register endpoint - used for user register
 * @param {string} email the user emall (Required for email validation and updates
 * @param {string} password the user password (saved on the db as SHA-256)
 * @returns {object} if success, { success: true }, else {success: false, message: 'An error message'}
 */
var RoutesRegister; //for docs purposes

var recordAccess = require("../utils/recordAccess").recordAccess;
var addCorsHeaders = require("../utils/addCorsHeaders").addCorsHeaders;
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var config = require("../config.js");
var getEmailParameters = require("../utils/getEmailParameters")
  .getEmailParameters;
var User = require("../models/userModel");

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
        { _id: 1, deleteAccount: 1 },
        (err, result) => {
          if (err) {
            response.json({
              success: false,
              message: "Could not connect to database. Please try again later."
            });

            return false;
          }

          if (result) {
            if (result.deleteAccount !== true) {
              response.json({
                success: false,
                message: "User already exists. Please login."
              });

              return false;
            } else {
              //update user
              User.updateOne(
                { email: userEmail },
                {
                  $set: {
                    isActivated: false,
                    lastAccess: new Date(Date.now()).toISOString(),
                    accessTimes: 0,
                    role: "user-1",
                    planExpirationDate: new Date(Date.now()).toISOString(),
                    deleteAccount: false,
                    accountDeletedDate: new Date("2049-12-31T11:59:59Z")
                  }
                },
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
                    newId,
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
            let user = new User({
              email: userEmail,
              password: bcrypt.hashSync(
                userPassword + config.classicAuth.secret,
                10
              ),
              isActivated: false,
              accessTimes: 0,
              role: "user-1",
              planExpirationDate: new Date(Date.now()).toISOString(),
              deleteAccount: false,
              accountDeletedDate: new Date("2049-12-31T11:59:59Z")
            });

            var newId = user._id;

            user
              .save()
              .then(savedUser => {
                var emailParameters = getEmailParameters(
                  userEmail,
                  newId,
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
};

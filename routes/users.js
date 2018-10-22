var express = require('express');
var router = express.Router();
var db = require('./../db/mysql');

router.post('/check-email', function(req, res, next) {
  db.query("select * from users where email_address = '" + req.body.email + "'", function (err, results, fields) {
    if (err) throw res.json({status: "error", data: null, error: err});
    if (!err) {
      if(results.length > 0){
        res.json({status: "error", data: null, msg: 'Email already exists.', error: null});
      }
      else {
        res.json({status: "ok", data: null, msg: '', error: null});
      }
    }
  });
});

router.post('/signup', function(req, res, next) {
  db.query("INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `address_line_one`, `address_line_two`, `city`, `zip_code`, `state`, " +
    "`country`, `phone_number`, `email_address`, `password`) " +
    "VALUES (NULL, '"+req.body.firstName+"', '"+req.body.lastName+"', '"+req.body.addressLineOne+"', '"+req.body.addressLineTwo+"'," +
    " '"+req.body.city+"', '"+req.body.zipCode+"', '"+req.body.state+"', '"+req.body.country+"', '"+req.body.phoneNumber+"', '"+req.body.emailAddress+"', '"+req.body.password+"');", function (err, results, fields) {
    if (err) throw res.json({status: "error", data: null, error: err});
    if (!err) {
      if(results){

        db.query("select * from users where user_id = '" + results.insertId + "'", function (err2, results2, fields2) {
          if (err2) throw res.json({status: "error", data: null, error: err2});
          if (!err2) {
            if(results2.length > 0){
              res.json({status: "ok", data: results2, msg: 'User created sucessfuly.', error: null});
            }
            else {
              res.json({status: "error", data: null, msg: 'Error retriving user information.', error: null});
            }
          }
        });
      }
      else {
        res.json({status: "error", data: null, msg: 'Failed to create a new user.', error: null});
      }
    }
  });
});

module.exports = router;
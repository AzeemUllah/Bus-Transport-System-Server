var express = require('express');
var router = express.Router();
var db = require('./../db/mysql');

router.get('/search-tickets', function(req, res, next) {
    db.query("select b.*, br.*, r.*, c1.city_name as departure_city_name, c2.city_name as arival_city_name, t1.terminal_name as departure_terminal_name, t2.terminal_name as arrival_terminal_name  from `bus_route` br, `bus` b, `route` r, `city` c1, `city` c2, `terminal` t1, `terminal` t2 where br.route_id in (SELECT route_id FROM `route` where departure_city_id = "+req.query.departure_city_id+" and arrival_city_id = "+req.query.arival_city_id+") and br.bus_id = b.bus_id and r.route_id = br.route_id and r.departure_city_id = c1.city_id and r.arrival_city_id = c2.city_id and t1.terminal_id = r.departure_terminal_id and t2.terminal_id = r.arrival_terminal_id", function (err, results, fields) {
        if (err) throw res.json({status: "error", data: null, error: err});
        if (!err) {
            if(results.length > 0){
                res.json({status: "ok", data: results, msg: '', error: null});
            }
            else
                res.json({status: "error", data: null, msg: 'No route found!', error: null});
        }
    });
});

router.get('/reserved-tickets', function(req, res, next) {
    db.query("SELECT seat_num FROM `bus_route_seats` where date = STR_TO_DATE('"+req.query.departure_date+"', '%m/%d/%Y') and bus_id = "+ req.query.bus_id+" and route_id = " + req.query.route_id, function (err, results, fields) {
        if (err) throw res.json({status: "error", data: null, error: err});
        if (!err) {
            if(results.length > 0){
                res.json({status: "ok", data: results, msg: '', error: null});
            }
            else
                res.json({status: "ok", data: [], msg: '', error: null});
        }
    });
});

router.post('/buy-ticket', function(req, res, next) {
  var seatNumbers = req.body.selectedSeats.split(",");
  db.query("INSERT INTO `billing_information` " +
    "(`billing_id`, `user_id`, `billing_first_name`, `billing_last_name`, `billing_address_line_one`, `billing_address_line_two`, " +
    "`billing_city`, `billing_zip_code`, `billing_state`, `billing_country`, `billing_phone_number`, " +
    "`billing_email_address`, `billing_card_number`, `billing_cvv`, `billing_expire_month`, `billing_year_year`)" +
    " VALUES (NULL, '"+req.body.userId+"', '"+req.body.biFirstName+"', '"+req.body.biLastName+"', '"+req.body.biAddressOne+"', '"+req.body.biAddressTwo+"'," +
    " '"+req.body.biCity+"', '"+req.body.biZip+"', '"+req.body.biState+"', '"+req.body.biCountry+"', '"+req.body.biPhoneNumber+"', " +
    "'"+req.body.biEmailAddress+"', '"+req.body.biCardNumber+"', '"+req.body.biCvv+"', '"+req.body.biExpireMonth+"', '"+req.body.biYear+"');", function (err, results, fields) {
    if (err) throw res.json({status: "error", data: null, error: err});
    if (!err) {
      if(results){
          biId = results.insertId;

          var counter = 0;
          for(var i = 0; i < seatNumbers.length; i++) {
              console.log("INSERT INTO `bus_route_seats` (`bus_id`, `route_id`, `seat_num`, `date`, `user_id`, `billing_id`) " +
                "VALUES ('" + req.body.bus_id + "', '" + req.body.routeId + "', '"+seatNumbers[i]+"', STR_TO_DATE('"+req.body.departureDate+"', '%m/%d/%Y'), '"+req.body.userId+"', '"+biId+"');");
            db.query("INSERT INTO `bus_route_seats` (`bus_id`, `route_id`, `seat_num`, `date`, `user_id`, `billing_id`) " +
              "VALUES ('" + req.body.bus_id + "', '" + req.body.routeId + "', '"+seatNumbers[i]+"', STR_TO_DATE('"+req.body.departureDate+"', '%m/%d/%Y'), '"+req.body.userId+"', '"+biId+"');", function (err, results, fields) {
              if (err) throw res.json({status: "error", data: null, error: err});
              if (!err) {
                if (!results) {
                  return res.json({status: "error", data: null, msg: 'Error booking seat(s).', error: null});
                }
                else{
                    counter++;
                    if(seatNumbers.length == counter){
                      return res.json({status: "ok", data: null, msg: 'Booking completed!', error: null});
                    }
                }
              }
            });
          }

      }
      else
        res.json({status: "error", data: null, msg: 'Failed to save Billing Information!', error: null});
    }
  });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('./../db/mysql');

// select departure.*, arival.* from 

// (SELECT
//     b.bus_name as departure_bus_name , b.num_seats as departure_num_seats , b.bus_is_active as departure_bus_is_active , b.bus_description as departure_bus_description,
//     br.bus_id as departure_bus_id , br.route_id as departure_route_id , br.complete_price as departure_complete_price , br.term_terrestrial_tax as departure_term_terrestrial_tax, br.commission_ticket_bus_company as departure_commission_ticket_bus_company , br.total_pay as departure_total_pay , br.frequency as departure_frequency , br.avaliable_seats as departure_avaliable_seats , br.filled_seats as departure_filled_seats , br.bus_route_description as departure_bus_route_description ,
//     r.route_name as departure_route_name , r.departure_city_id as departure_departure_city_id , r.departure_terminal_id as departure_departure_terminal_id , r.departure_time as departure_departure_time , r.arrival_time as departure_arrival_time , r.route_is_active as departure_route_is_active , r.route_description as departure_route_description , r.travel_time as departure_travel_time ,
//     c1.city_name AS departure_departure_city_name,
//     c2.city_name AS departure_arival_city_name,
//     t1.terminal_name AS departure_departure_terminal_name,
//     t2.terminal_name AS departure_arrival_terminal_name
// FROM
//     `bus_route` br,
//     `bus` b,
//     `route` r,
//     `city` c1,
//     `city` c2,
//     `terminal` t1,
//     `terminal` t2
// WHERE
//     br.route_id IN(
//     SELECT
//         route_id
//     FROM
//         `route`
//     WHERE
//         departure_city_id = "+req.query.departure_city_id+" AND arrival_city_id = "+req.query.arival_city_id+"
// ) AND br.bus_id = b.bus_id AND r.route_id = br.route_id AND r.departure_city_id = c1.city_id AND r.arrival_city_id = c2.city_id AND t1.terminal_id = r.departure_terminal_id AND t2.terminal_id = r.arrival_terminal_id) as departure

// ,

// (SELECT
//     b.bus_name as arival_bus_name , b.num_seats as arival_num_seats , b.bus_is_active as arival_bus_is_active , b.bus_description as arival_bus_description,
//     br.bus_id as arival_bus_id , br.route_id as arival_route_id , br.complete_price as arival_complete_price , br.term_terrestrial_tax as arival_term_terrestrial_tax, br.commission_ticket_bus_company as arival_commission_ticket_bus_company , br.total_pay as arival_total_pay , br.frequency as arival_frequency , br.avaliable_seats as arival_avaliable_seats , br.filled_seats as arival_filled_seats , br.bus_route_description as arival_bus_route_description ,
//     r.route_name as arival_route_name , r.departure_city_id as arival_departure_city_id , r.departure_terminal_id as arival_departure_terminal_id , r.departure_time as arival_departure_time , r.arrival_time as arival_arrival_time , r.route_is_active as arival_route_is_active , r.route_description as arival_route_description , r.travel_time as arival_travel_time ,
//     c1.city_name as arival_departure_city_name,
//     c2.city_name as arival_arival_city_name,
//     t1.terminal_name as arival_departure_terminal_name,
//     t2.terminal_name as arival_arrival_terminal_name
// FROM
//     `bus_route` br,
//     `bus` b,
//     `route` r,
//     `city` c1,
//     `city` c2,
//     `terminal` t1,
//     `terminal` t2
// WHERE
//     br.route_id IN(
//     SELECT
//         route_id
//     FROM
//         `route`
//     WHERE
//         departure_city_id = "+req.query.arival_city_id+" AND arrival_city_id = "+req.query.departure_city_id+"
// ) AND br.bus_id = b.bus_id AND r.route_id = br.route_id AND r.departure_city_id = c1.city_id AND r.arrival_city_id = c2.city_id AND t1.terminal_id = r.departure_terminal_id AND t2.terminal_id = r.arrival_terminal_id) as arival


// where arival.arival_bus_id = departure.departure_bus_id

router.get('/search-tickets', function(req, res, next) {
    // db.query("select b.*, br.*, r.*, c1.city_name as departure_city_name, c2.city_name as arival_city_name, t1.terminal_name as departure_terminal_name, t2.terminal_name as arrival_terminal_name  from `bus_route` br, `bus` b, `route` r, `city` c1, `city` c2, `terminal` t1, `terminal` t2 where br.route_id in (SELECT route_id FROM `route` where departure_city_id = "+req.query.departure_city_id+" and arrival_city_id = "+req.query.arival_city_id+") and br.bus_id = b.bus_id and r.route_id = br.route_id and r.departure_city_id = c1.city_id and r.arrival_city_id = c2.city_id and t1.terminal_id = r.departure_terminal_id and t2.terminal_id = r.arrival_terminal_id", function (err, results, fields) {
    //     if (err) throw res.json({status: "error", data: null, error: err});
    //     if (!err) {
    //         if(results.length > 0){
    //             res.json({status: "ok", data: results, msg: '', error: null});
    //         }
    //         else
    //             res.json({status: "error", data: null, msg: 'No route found!', error: null});
    //     }
    // });
    console.log(req.query.arivalDate)
    if(req.query.arivalDate.length > 0){
        console.log("HERE")
        db.query("select departure.*, arival.* from (SELECT b.bus_name as departure_bus_name , b.num_seats as departure_num_seats , b.bus_is_active as departure_bus_is_active , b.bus_description as departure_bus_description, br.bus_id as departure_bus_id , br.route_id as departure_route_id , br.complete_price as departure_complete_price , br.term_terrestrial_tax as departure_term_terrestrial_tax, br.commission_ticket_bus_company as departure_commission_ticket_bus_company , br.total_pay as departure_total_pay , br.frequency as departure_frequency , br.avaliable_seats as departure_avaliable_seats , br.filled_seats as departure_filled_seats , br.bus_route_description as departure_bus_route_description , r.route_name as departure_route_name , r.departure_city_id as departure_departure_city_id , r.departure_terminal_id as departure_departure_terminal_id , r.departure_time as departure_departure_time , r.arrival_time as departure_arrival_time , r.route_is_active as departure_route_is_active , r.route_description as departure_route_description , r.travel_time as departure_travel_time , c1.city_name AS departure_departure_city_name, c2.city_name AS departure_arival_city_name, t1.terminal_name AS departure_departure_terminal_name, t2.terminal_name AS departure_arrival_terminal_name FROM `bus_route` br, `bus` b, `route` r, `city` c1, `city` c2, `terminal` t1, `terminal` t2 WHERE br.route_id IN( SELECT route_id FROM `route` WHERE departure_city_id = "+req.query.departure_city_id+" AND arrival_city_id = "+req.query.arival_city_id+" ) AND br.bus_id = b.bus_id AND r.route_id = br.route_id AND r.departure_city_id = c1.city_id AND r.arrival_city_id = c2.city_id AND t1.terminal_id = r.departure_terminal_id AND t2.terminal_id = r.arrival_terminal_id) as departure , (SELECT b.bus_name as arival_bus_name , b.num_seats as arival_num_seats , b.bus_is_active as arival_bus_is_active , b.bus_description as arival_bus_description, br.bus_id as arival_bus_id , br.route_id as arival_route_id , br.complete_price as arival_complete_price , br.term_terrestrial_tax as arival_term_terrestrial_tax, br.commission_ticket_bus_company as arival_commission_ticket_bus_company , br.total_pay as arival_total_pay , br.frequency as arival_frequency , br.avaliable_seats as arival_avaliable_seats , br.filled_seats as arival_filled_seats , br.bus_route_description as arival_bus_route_description , r.route_name as arival_route_name , r.departure_city_id as arival_departure_city_id , r.departure_terminal_id as arival_departure_terminal_id , r.departure_time as arival_departure_time , r.arrival_time as arival_arrival_time , r.route_is_active as arival_route_is_active , r.route_description as arival_route_description , r.travel_time as arival_travel_time , c1.city_name as arival_departure_city_name, c2.city_name as arival_arival_city_name, t1.terminal_name as arival_departure_terminal_name, t2.terminal_name as arival_arrival_terminal_name FROM `bus_route` br, `bus` b, `route` r, `city` c1, `city` c2, `terminal` t1, `terminal` t2 WHERE br.route_id IN( SELECT route_id FROM `route` WHERE departure_city_id = "+req.query.arival_city_id+" AND arrival_city_id = "+req.query.departure_city_id+" ) AND br.bus_id = b.bus_id AND r.route_id = br.route_id AND r.departure_city_id = c1.city_id AND r.arrival_city_id = c2.city_id AND t1.terminal_id = r.departure_terminal_id AND t2.terminal_id = r.arrival_terminal_id) as arival where arival.arival_bus_id = departure.departure_bus_id", function (err, results, fields) {
            if (err) throw res.json({status: "error", data: null, error: err});
            if (!err) {
                if(results.length > 0){
                    res.json({status: "ok", data: results, msg: '', error: null});
                }
                else
                    res.json({status: "error", data: null, msg: 'No route found!', error: null});
            }
        });
    }
    else{
        console.log("HERE 2")
        db.query("SELECT b.bus_name AS departure_bus_name, b.num_seats AS departure_num_seats, b.bus_is_active AS departure_bus_is_active, b.bus_description AS departure_bus_description, br.bus_id AS departure_bus_id, br.route_id AS departure_route_id, br.complete_price AS departure_complete_price, br.term_terrestrial_tax AS departure_term_terrestrial_tax, br.commission_ticket_bus_company AS departure_commission_ticket_bus_company, br.total_pay AS departure_total_pay, br.frequency AS departure_frequency, br.avaliable_seats AS departure_avaliable_seats, br.filled_seats AS departure_filled_seats, br.bus_route_description AS departure_bus_route_description, r.route_name AS departure_route_name, r.departure_city_id AS departure_departure_city_id, r.departure_terminal_id AS departure_departure_terminal_id, r.departure_time AS departure_departure_time, r.arrival_time AS departure_arrival_time, r.route_is_active AS departure_route_is_active, r.route_description AS departure_route_description, r.travel_time AS departure_travel_time, c1.city_name AS departure_departure_city_name, c2.city_name AS departure_arival_city_name, t1.terminal_name AS departure_departure_terminal_name, t2.terminal_name AS departure_arrival_terminal_name FROM `bus_route` br, `bus` b, `route` r, `city` c1, `city` c2, `terminal` t1, `terminal` t2 WHERE br.route_id IN( SELECT route_id FROM `route` WHERE departure_city_id = "+req.query.departure_city_id+" AND arrival_city_id = "+req.query.arival_city_id+" ) AND br.bus_id = b.bus_id AND r.route_id = br.route_id AND r.departure_city_id = c1.city_id AND r.arrival_city_id = c2.city_id AND t1.terminal_id = r.departure_terminal_id AND t2.terminal_id = r.arrival_terminal_id ", function (err, results, fields) {
            if (err) throw res.json({status: "error", data: null, error: err});
            if (!err) {
                if(results.length > 0){
                    res.json({status: "ok", data: results, msg: '', error: null});
                }
                else
                    res.json({status: "error", data: null, msg: 'No route found!', error: null});
            }
        });
    }
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

var express = require('express');
var router = express.Router();
var db = require('./../db/mysql');

router.get('/', function(req, res, next) {
    db.query("SELECT * FROM `city`", function (err, results, fields) {
        if (err) throw res.json({status: "error", data: null, error: err});
        if (!err) {
            if(results.length > 0)
                res.json({status: "ok", data: results, error: null});
            else
                res.json({status: "error", data: null, msg: 'No city found!', error: null});
        }
    });
});

module.exports = router;

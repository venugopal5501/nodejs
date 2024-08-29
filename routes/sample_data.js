var express = require("express");
var router = express.Router();
var database = require('../database');
router.get("/", function (request, response, next) {
    var query1 = "select *from Customer order by address desc";
    database.query(query1, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            response.render('samples', {
                title: 'Nodejs Application',
                action: "list",
                Data: data.recordset
            });
        }
    });

});

router.get("/add", function (request, response, next) {
    response.send("Add sample data");
});

router.get("/ad", function (request, response, next) {
    response.send("Add sample data");
});

module.exports = router;

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
    response.render("samples1", { title: 'Data Insertion', action: 'list' });


});

router.post("/add_sample", function (request, response, next) {
    var No = request.body.No;
    var Fname = request.body.Fname;
    var Lname = request.body.Lname;
    var Phone = request.body.Phone;
    var Address = request.Address;

    var query = `insert into Customer(Fname,Lname,Phone,Address)
    values('${Fname}','${Lname}','${Phone}','${Address}')`;

    database.query(query, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            response.redirect("/samples1");
        }
    })

});

router.get("/ad", function (request, response, next) {
    response.send("Add sample data");
});

module.exports = router;

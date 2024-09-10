var express = require("express");
var router = express.Router();
var database = require('../database');
const helpers = require('../views/helpers');

router.get("/", function (request, response, next) {
    var query1 = "EXEC dbo.CalculateAllPayDetailsForEmployees";
    database.query(query1, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            response.render('samples1', {
                title: 'Nodejs Application',
                action: "list",
                Data: data.recordset,
                message: request.flash('success'),
                formatDate: helpers.formatDate
            });
        }
    });

});

router.get("/add", function (request, response, next) {
    response.render("samples1", { title: 'Data Insertion', action: 'add',
        message: request.flash('success'),
     });
});

router.post("/add_sample", function (request, response, next) {
    var No = request.body.empno;
    var name = request.body.name;
    var email = request.body.email;
    var doj = request.body.doj;
    var basic_pay = request.body.basic_pay;
    // console.log(No, Fname, Lname, Phone, Address);
    var query1 = `insert into payslip(empno,name,email,doj,basic_pay)
    values(${No},'${name}','${email}','${doj}',${basic_pay})`;

    database.query(query1, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            // request.flash('success', 'Data Inserted');
            response.redirect("/sample");

        }

    })

});

router.get("/edit/:id", function (request, response, next) {
    var id = request.params.id;
    var query2 = `select *from payslip where empno=${id}`;
    database.query(query2, function (error, data) {
        response.render('edit', {
            title: 'Edit SQL Data',
            action: 'edit1',
            Data: data.recordset[0],
            formatDate: helpers.formatDate,
            message: request.flash('success'),
        });
    });
});
// response.send("Add sample data");

router.post('/edit/:id', function (request, response, next) {
    var id = request.params.id;
    var empno = request.body.empno;
    var name = request.body.name;
    var email = request.body.email;
    var doj = request.body.doj;
    var basic_pay = request.body.basic_pay;
    // var Address = request.body.Address;

    var query3 = `update payslip set empno=${id},name='${name}', email='${email}', doj='${doj}', basic_pay=${basic_pay} where empno=${id}`;

    database.query(query3, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            // response.flash('success', 'Data Updated');
            response.redirect("/sample");
        }
    })
})


router.get('/delete/:id', function (request, response, next) {
    var id = request.params.id;
    var query4 = `Delete from payslip where empno=${id}`;
    database.query(query4, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            request.flash('success', 'Data Deleted');
            response.redirect("/sample");
        }
    })

})


module.exports = router;

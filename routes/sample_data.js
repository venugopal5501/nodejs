var express = require("express");
var router = express.Router();
const database = require('../database');
const helpers = require('../views/helpers');
//const helping = require('../views/example');
const { flash } = require('connect-flash');
// const experience = require('..year.js')

router.get("/", function (request, response, next) {
    var query1 = "EXEC dbo.CalculateAllPayDetailsEmployees";
    database.query(query1, function (error, data) {
        if (error) {
            // request.flash('error', 'Failed to retrieve data');
            throw error;
        }
        else {
            response.render('samples1', {
                title: 'Nodejs Application',
                action: "list",
                Data: data.recordset,
                // message: request.flash(),
                formateDate: helpers.formateDate,
                // year: helping.year,
            });
        }
    });
});

router.get("/add", function (request, response, next) {
    response.render("samples1", { 
        title: 'Data Insertion', 
        action: 'add',
        // message: request.flash(),
     });
});

router.post("/add_sample", function (request, response, next) {
    var No = request.body.empno;
    var name = request.body.name;
    var email = request.body.email;
    var doj = request.body.doj;
    var basic_pay = request.body.basic_pay;

    var query1 = `insert into payslips(empno,name,email,doj,basic_pay)
    values(${No},'${name}','${email}','${doj}',${basic_pay})`;

    database.query(query1, function (error, data) {
        if (error) {
            // request.flash('error', 'Failed to insert data');
            throw error;
        }
        else {
            // request.flash('success', 'Data Inserted successfully');
            response.redirect("/sample");
        }
    })
});

router.get("/edit/:id", function (request, response, next) {
    var id = request.params.id;
    var query2 = `select *from payslips where empno=${id}`;
    database.query(query2, function (error, data) {
        if (error) {
            // request.flash('error', 'Failed to retrieve data for editing');
            throw error;
        }
        response.render('edit', {
            title: 'Edit SQL Data',
            action: 'edit1',
            Data: data.recordset[0],
            // message: request.flash(),
            formateDate: helpers.formateDate,
            // year: helping.year,
            
       
        });
    });
});

router.post('/edit/:id', function (request, response, next) {
    var id = request.params.id;
    var empno = request.body.empno;
    var name = request.body.name;
    var email = request.body.email;
    var doj = request.body.doj;
    var basic_pay = request.body.basic_pay;

    var query3 = `update payslips set empno=${id},name='${name}', email='${email}', doj='${doj}', basic_pay=${basic_pay} where empno=${id}`;

    database.query(query3, function (error, data) {
        if (error) {
            // request.flash('error', 'Failed to update data');
            throw error;
        }
        else {
            // request.flash('success', 'Data Updated successfully');
            response.redirect("/sample");
        }
    })
});

router.get('/delete/:id', function (request, response, next) {
    var id = request.params.id;
    var query4 = `Delete from payslips where empno=${id}`;
    database.query(query4, function (error, data) {
        if (error) {
            // request.flash('error', 'Failed to delete data');
            throw error;
        }
        else {
            // request.flash('success', 'Data Deleted successfully');
            response.redirect("/sample");
        }
    })
});

router.get('/view/:id', function (request, response, next) {
    var id = request.params.id;
    var query2 = `SELECT * FROM payslips WHERE empno=${id}`;
    database.query(query2, function (error, data) {
        if (error) {
            // request.flash('error', 'Failed to retrieve data for viewing');
            throw error;
        }
        response.render('view_sample', {
            title: 'View Sample Data',
            action: 'view',
            Data: data.recordset[0],
            // message: request.flash(),
            formateDate: helpers.formateDate,
            // year: helping.year,
           
        });
    });
});

module.exports = router;
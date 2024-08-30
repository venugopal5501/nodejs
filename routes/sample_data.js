var express = require("express");
var router = express.Router();
var database = require('../database');
router.get("/", function (request, response, next) {
    var query1 = "select *from Customer order by No asc";
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
    var No = request.body.No;
    var Fname = request.body.Fname;
    var Lname = request.body.Lname;
    var Phone = request.body.Phone;
    var Address = request.body.Address;
    console.log(No, Fname, Lname, Phone, Address);
    var query1 = `insert into Customer(No,Fname,Lname,Phone,Address)
    values(${No},'${Fname}','${Lname}',${Phone},'${Address}')`;

    database.query(query1, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            request.flash('success', 'Data Inserted');
            response.redirect("/sample");

        }

    })

});

router.get("/edit/:id", function (request, response, next) {
    var id = request.params.id;
    var query2 = `select *from Customer where No=${id}`;
    database.query(query2, function (error, data) {
        response.render('edit', {
            title: 'Edit SQL Data',
            action: 'edit1',
            Data: data.recordset[0],
            message: request.flash('success'),
        });
    });
});
// response.send("Add sample data");

router.post('/edit/:id', function (request, response, next) {
    var id = request.params.id;
    var No = request.body.No;
    var Fname = request.body.Fname;
    var Lname = request.body.Lname;
    var Phone = request.body.Phone;
    var Address = request.body.Address;

    var query3 = `update Customer set No='${id}',Fname='${Fname}', Lname='${Lname}', Phone='${Phone}', Address='${Address}' where No=${id}`;

    database.query(query3, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            response.flash('success', 'Data Updated');
            response.redirect("/sample");
        }
    })
})


router.get('/delete/:id', function (request, response, next) {
    var id = request.params.id;
    var query4 = `Delete from Customer where No=${id}`;
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

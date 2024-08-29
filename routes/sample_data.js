var express = require("express");
var router = express.Router();
var database = require('../database');
router.get("/", function (request, response, next) {
    response.send("VenuGopal")
})

router.get("/add", function (request, response, next) {
    response.send("Add sample data");
});

router.get("/ad", function (request, response, next) {
    response.send("Add sample data");
});

module.exports = router;

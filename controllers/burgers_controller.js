// Require express and burger.js
var express = require("express");
var burger = require("../models/burger.js");

// create router
var router = express.Router();

// Routes and logic here

// get method at root
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var burgersObject = {
            burgers: data
        };
        console.log(burgersObject);
        res.render("index", burgersObject);
    });
});

// post method to /api/burgers
router.post("/api/burgers", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

// put method to /api/burgers/:id with id specified
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    
    console.log("condition: " + condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// export router
module.exports = router;
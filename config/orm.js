// require connection.js
var connection = require("./connection.js");

// function for SQL syntax
// input a number 'num' and printQuestionMarks will return a string
// of that many question marks separated by commas
function printQuestionMarks(num) {
    var arr = [];
    for (i= 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// function to convert object key/value pairs into SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int into arr
    for (var key in ob) {
        var value = ob[key];
        //check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if this is a string with spaces, add quotation marks
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // convert to SQL syntax
            // e.g. {name: 'Joes burger'} => ["name='Joes burger'"]
            arr.push(key + "=" + value);
        }
    }

    // return arr as a single, comma-separated string
    return arr.toString();
}

// Define ORM
var orm = {
    // Method selectAll returns all items in database
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(
            queryString,
            function(err, result) {
                if (err) throw err;
                cb(result);
            }
        );
    },
    // Method insertOne creates a new item in database
    insertOne: function(tableInput, cols, vals, cb) {
        var queryString = "INSERT INTO " + tableInput;
        queryString += " (" + cols.toString() + ") ";
        queryString += "VALUES (" + printQuestionMarks(vals.length) + ")";

        console.log(queryString);

        connection.query(
            queryString,
            vals,
            function(err, result) {
                if (err) throw err;
                cb(result);
            }
        );
    },
    // Method updateOne updates an existing item in database
    updateOne: function(tableInput, objColVals, condition, cb) {
        var queryString = "UPDATE " + tableInput;
        queryString += " SET " + objToSql(objColVals);
        queryString += " WHERE " + condition;

        console.log(queryString);

        connection.query(
            queryString,
            function(err, result) {
                if (err) throw err;
                cb(result);
            }
        );
    },
    // Method deleteOne deletes a burger from the database
    deleteOne: function(tableInput, condition, cb) {
        var queryString = "DELETE FROM " + tableInput;
        queryString += " WHERE " + condition;
        console.log(queryString);

        connection.query(
            queryString,
            function(err, result) {
                if(err) throw err;
                cb(result);
            }
        );
    }
};

module.exports = orm;
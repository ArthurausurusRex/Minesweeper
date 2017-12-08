var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var SCORES_COLLECTION = "scores";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('localhost:27017', function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/api/scores"
 *    POST: creates a new score
 */


app.post("/api/scores", function(req, res) {
    const newScore = req.body;

    if (!req.body.score || !req.body.player) {
        handleError(res, "Invalid user input", "Must provide a name and a score.", 400);
    }

    db.collection(SCORES_COLLECTION).insertOne(newScore, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to save new score.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/api/scores/top/:difficulty"
 *    GET: find top 10 scores by difficulty ?
 */

app.get("/api/scores/top/:difficulty", function(req, res) {
    db.collection(SCORES_COLLECTION).find({ difficulty: new ObjectID(req.params.difficulty) }).sort({score :1}).
    limit(10).toArray(function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to get scores");
        } else {
            res.status(200).json(result);
        }
    });

});
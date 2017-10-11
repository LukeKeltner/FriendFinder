var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, "app", "public")));


app.get("/", function(req, res)
{
	res.sendFile(path.join(__dirname, "app", "public", "home.html"))
})

/*app.get("/homeScript.js", function(req, res)
{
	res.sendFile(path.join(__dirname, "app", "public", "homeScript.js"))
})

app.get("/survey", function(req, res)
{
	res.sendFile(path.join(__dirname, "app", "public", "survey.html"))
})
*/



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
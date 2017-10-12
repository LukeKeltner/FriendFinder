var express = require("express");
var path = require("path");
var router = express.Router()


router.get("/:location?", function(req, res)
{
	var chosen = req.params.location;
	console.log(chosen)
	
	if (chosen === "survey")
	{
		res.sendFile(path.join(__dirname, "..", "public", "survey.html"))
	}

	else
	{
		res.sendFile(path.join(__dirname, "..", "public", "home.html"))
	}
})

module.exports = router;
var express = require("express");
var path = require("path");
var router = express.Router()
var friends = require(path.join(__dirname, "..", "data", "friends.js"))

router.get("/api/friends", function(req, res)
{
	res.json(friends)
})

router.post("/api/friends", function(req, res)
{
	var newFriend = req.body
	var closestMatchIndex = 0;
	var closestMatchScore = 100;

	for (var i=0; i<friends.length; i++)
	{
		relativeScore = 0

		for (var j=0; j<newFriend.scores.length; j++)
		{
			relativeScore =  relativeScore + Math.abs(newFriend.scores[j] - friends[i].scores[j]);
		}

		if (relativeScore < closestMatchScore)
		{
			closestMatchScore = relativeScore;
			closestMatchIndex = i;
		}
	}

	console.log("Your closest match is "+friends[closestMatchIndex].name)

	friends.push(newFriend)
	res.json(friends[closestMatchIndex])
})

module.exports = router;
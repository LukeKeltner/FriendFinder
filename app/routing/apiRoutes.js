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
	var relativeScores = []

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

	console.log(relativeScores)
	console.log("Your closest match is "+friends[closestMatchIndex].name)

	//So user can't match with themselves!
	friends.push(newFriend)
	res.json(newFriend)
})

module.exports = router;
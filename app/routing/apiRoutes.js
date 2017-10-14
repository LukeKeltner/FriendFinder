var express = require("express");
var path = require("path");
var fs = require('fs-extra');
var friendsPath = path.join(__dirname, "..", "data", "friends.json");
var questionsPath = path.join(__dirname, "..", "data", "questions.json");

var router = express.Router();

router.get("/api/questions", function(req, res)
{
	fs.readJson(questionsPath)
	.then(function(questions)
	{
		console.log(questions)
		res.json(questions);
	})
	.catch(function(err)
	{
		console.log(err);
	})
})

router.get("/api/friends", function(req, res)
{
	fs.readJson(friendsPath)
	.then(function(friends)
	{
		res.json(friends);
	})
	.catch(function(err)
	{
		console.log(err);
	})
})

router.post("/api/friends", function(req, res)
{
	fs.readJson(friendsPath)
	.then(function(friends)
	{
		var newFriend = req.body;
		var closestMatchIndex = 0;
		var closestMatchScore = 100;

		for (var i=0; i<friends.length; i++)
		{
			relativeScore = 0;

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

		console.log("Your closest match is "+friends[closestMatchIndex].name);
		friends.push(newFriend);
		fs.writeJson(friendsPath, friends);
		res.json(friends[closestMatchIndex]);
	})
	.catch(function(err)
	{
		console.error(err);
	})
})

module.exports = router;
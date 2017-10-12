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

	for (var i=0; i<friends.length; i++)
	{
		console.log(friends[i].name)
	}


	//So user can match with themselves!
	friends.push(newFriend)
	res.json(newFriend)
})

module.exports = router;
$('.custom-select').on('click', function(event)
{
	var res = $(this).find("option:selected").text().substring(0, 6);
	var id = $(this).attr('id').substring(0,1)

	if (res === "Answer")
	{
		$('#'+id).removeClass('bg-success')
	}

	else
	{
		$('#'+id).addClass('bg-success')
	}
});

$('#submit').on('click', function(event)
{
	answers = []
	sum = 0

	for (var i=0; i<10; i++)
	{
		answers.push(parseInt($('#'+i+'-answer').val().substring(0,1)))
	}

	for (var i=0; i<answers.length; i++)
	{
		sum = sum + answers[i]
	}

	if ($('#name-input').val() && $('#photo-input').val()  && !isNaN(sum))
	{
		var newFriend = 
		{
			name: $('#name-input').val(),
			photo: $('#photo-input').val(),
			scores: answers
		}

		$.post("/api/friends", newFriend)
		.done( function(data)
		{
			console.log(data)
		})
	}

	else
	{
		alert("Please fill out the entire survey.")
	}
})
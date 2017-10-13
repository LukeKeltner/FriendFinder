

picVerified = false;



//myPicture.onError = errorHandler();


$('#verify').on('click', function(event)
{
	picVerified = true;
	$('#verify').removeClass('btn-danger')
	$('#verify').removeClass('btn-success')
	$('#verify').addClass('btn-success')
	$('#verify').html("Looks Good!")

	$('#verify-pic').attr("src", $('#photo-input').val())
	$('#verify-pic').on("error", function()
	{
		$('#verify-pic').attr("src", 'https://t4.ftcdn.net/jpg/01/02/43/95/240_F_102439515_sPOWQt2qQ3JKT9auGuOJxAY0Lu0tjDHR.jpg')
		$('#verify').removeClass('btn-primary')
		$('#verify').removeClass('btn-success')
		$('#verify').addClass('btn-danger')
		$('#verify').html("Try Again!")
		picVerified = false;
	})
})

$('.custom-select').on('click', function(event)
{
	var res = $(this).find("option:selected").text().substring(0, 6);
	var id = $(this).attr('id').substring(0,1)

	if (res === "Answer")
	{
		$('#'+id).css('background-color', 'white')
	}

	else
	{
		$('#'+id).css('background-color', '#a7ffa3')
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

	if ($('#name-input').val() && $('#photo-input').val()  && !isNaN(sum) && picVerified)
	{
		var newFriend = 
		{
			name: $('#name-input').val(),
			photo: $('#photo-input').val(),
			scores: answers
		}

		$.post("/api/friends", newFriend)
		.done(function(data)
		{
			console.log(data)
			$('#friend-modal').modal('show')
			$('#match-name').html(data.name)
			$('#match-img').attr('src', data.photo)
		})
	}

	else
	{
		$('#incomplete-survey').modal('show')
		$('#what-to-finish').html("")
		$('#what-to-finish').html("Please complete the entire survey.")

		if (!picVerified)
		{
			$('#what-to-finish').append("<br>Please verify your picture.")
		}
	}
})
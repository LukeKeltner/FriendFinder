var questionsAnswered = [0,0,0,0,0,0,0,0,0,0]

$('.custom-select').on('click', function(event)
{
	//console.log($(this).val())
	var res = $(this).find("option:selected").text().substring(0, 6);
	var id = $(this).attr('id').substring(0,1)
	//console.log(id)

	if (res === "Answer")
	{
		questionsAnswered = questionsAnswered - 1;
		$('#'+id).removeClass('bg-success')
		//console.log(questionsAnswered)
	}

	else
	{
		questionsAnswered = questionsAnswered + 1;
		$('#'+id).addClass('bg-success')
		//console.log(questionsAnswered)
	}
});

$('#submit').on('click', function(event)
{
	answers = []

	for (var i=0; i<10; i++)
	{
		answers.push(parseInt($('#'+i+'-answer').val().substring(0,1)))
	}
/*
	var ans1 = parseInt($('#1-answer').val().substring(0,1))
	var ans2 = parseInt($('#2-answer').val().substring(0,1))
	var ans3 = parseInt($('#3-answer').val().substring(0,1))
	var ans4 = parseInt($('#4-answer').val().substring(0,1))
	var ans5 = parseInt($('#5-answer').val().substring(0,1))
	var ans6 = parseInt($('#6-answer').val().substring(0,1))
	var ans7 = parseInt($('#7-answer').val().substring(0,1))
	var ans8 = parseInt($('#8-answer').val().substring(0,1))
	var ans9 = parseInt($('#9-answer').val().substring(0,1))
	var ans10 = parseInt($('#0-answer').val().substring(0,1))*/

	sum = 0

	for (var i=0; i<answers.length; i++)
	{
		sum = sum + answers[i]
	}

	console.log(sum)


	if($('#name-input').val() && $('#photo-input').val()  && !isNaN(sum))
	{
		console.log("Yes");
	}

	else
	{
		alert("Please fill out the entire survey.")
	}

})
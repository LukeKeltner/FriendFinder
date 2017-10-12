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
	var ans1 = parseInt($('#1-answer').val().substring(0,1))
	var ans2 = parseInt($('#2-answer').val().substring(0,1))
	var ans3 = parseInt($('#3-answer').val().substring(0,1))
	var ans4 = parseInt($('#4-answer').val().substring(0,1))
	var ans5 = parseInt($('#5-answer').val().substring(0,1))
	var ans6 = parseInt($('#6-answer').val().substring(0,1))
	var ans7 = parseInt($('#7-answer').val().substring(0,1))
	var ans8 = parseInt($('#8-answer').val().substring(0,1))
	var ans9 = parseInt($('#9-answer').val().substring(0,1))
	var ans10 = parseInt($('#0-answer').val().substring(0,1))

	sum = ans1 + ans2 + ans3 + ans4 + ans5 + ans6 + ans7 + ans8 + ans9 + ans10

	if (isNaN(sum))
	{
		alert("Please answer all the questions.")
	}

})
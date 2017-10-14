var picVerified = false;
var pic = "";
var questionBank;

//Doing this has made me apprecaite handlebars I think :)
var buildQuestions = function(i, text)
{
	var questionNumber = i+1
	var htmlDumpsterFire = $(
	'<div class="row">'
		+'<div class="col-md-12">'
			+'<div class="card" id="'+i+'">'
				+'<div class="card-body">'
					+'<h3 class="card-title">Question '+questionNumber+'</h3>'
					+'<div id="question-text">'
						+''+text+''
					+'</div>'

					+'<select class="custom-select mb-2 mr-sm-2 mb-sm-0 pull-right" id="'+i+'-answer">'
						+'<option selected>Answer to #'+questionNumber+'</option>'
						+'<option value="1" class="test">1 (Stronly Disagree)</option>'
						+'<option value="2" class="test">2</option>'
						+'<option value="3" class="test">3</option>'
						+'<option value="4" class="test">4</option>'
						+'<option value="5" class="test">5 (Strongly Agree)</option>'
					+'</select>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div>')

	$('#question-container').append(htmlDumpsterFire)
}

$.get('/api/questions', function(data)
{
	questionBank = data;

	for (var i=0; i<questionBank.length; i++)
	{
		buildQuestions(i, questionBank[i].question)
	}

})

$('#verify').on('click', function(event)
{
	picVerified = true;
	$('#verify').removeClass('btn-danger');
	$('#verify').removeClass('btn-success');
	$('#verify').addClass('btn-success');
	$('#verify').html("Looks Good!");

	$('#verify-pic').attr("src", $('#photo-input').val());
	pic = $('#photo-input').val();
	$('#verify-pic').on("error", function()
	{
		$('#verify-pic').attr("src", 'https://t4.ftcdn.net/jpg/01/02/43/95/240_F_102439515_sPOWQt2qQ3JKT9auGuOJxAY0Lu0tjDHR.jpg');
		$('#verify').removeClass('btn-primary');
		$('#verify').removeClass('btn-success');
		$('#verify').addClass('btn-danger');
		$('#verify').html("Try Again!");
		picVerified = false;
	})
})

$(document).on('click', '.custom-select', function(event)
{
	var res = $(this).find("option:selected").text().substring(0, 6);
	var id = $(this).attr('id').substring(0,1);

	if (res === "Answer")
	{
		//$('#'+id).css('border', '0.1px solid rgba(0,0,0,.125)');
		$('#'+id).css('background-color', 'white');
		$('#'+id).css('color', 'black');
	}

	else
	{
		//$('#'+id).css('border', '3px solid #28a745');
		$('#'+id).css('background-color', '#28a745');
		$('#'+id).css('color', 'white');
	}
});

$('#submit').on('click', function(event)
{
	answers = [];
	//sum = 0;

	for (var i=0; i<10; i++)
	{
		answers.push(parseInt($('#'+i+'-answer').val().substring(0,1)));
	}

	var sum = answers.reduce(function(sum, num)
	{
		return sum + num;
	})

	if ($('#name-input').val() && !isNaN(sum) && picVerified)
	{
		var newFriend = 
		{
			name: $('#name-input').val(),
			photo: pic,
			scores: answers
		};

		$.post("/api/friends", newFriend)
		.done(function(data)
		{
			console.log(data);
			$('#friend-modal').modal('show');
			$('#match-name').html(data.name);
			$('#match-img').attr('src', data.photo);
		})
	}

	else
	{
		$('#incomplete-survey').modal('show');
		$('#what-to-finish').html("");
		$('#what-to-finish').html("Please complete the entire survey.");

		if (!picVerified)
		{
			$('#what-to-finish').append("<br>Please verify your picture.");
		}
	}
})
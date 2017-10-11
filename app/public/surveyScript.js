$('.custom-select').on('click', function(event)
{
	var res = $(this).find("option:selected").text().substring(0, 6);
	var id = $(this).attr('id').substring(0,1)
	console.log(id)

	if (res === "Answer")
	{
		$('#'+id).removeClass('bg-success')
	}

	else
	{
		$('#'+id).addClass('bg-success')	
	}
});
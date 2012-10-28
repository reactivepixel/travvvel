$(document).ready(function() {
	var input;
	$.ajax({
		url			: "http://api.dribbble.com/shots/popular/",
		dataType	: "jsonp",
		data 		: input,
		success		: function(d){
			dataStream = d;
			intNext = setInterval(nextImg, 1000);
		},
		error		: function(d){
			console.log("failure", d);
		}
	})

});

var dataStream,
	index = 0,
	intNext;

function nextImg(){
	if(index >= dataStream.shots.length){
		delete intNext;
		return false;
	}
	imgData = dataStream.shots[index]
	var img = $("#gallery").append('<img class="closed" src="' + imgData.image_url + '" />');
	setTimeout(openImg(img), 1000);
	index++;
}

function openImg(elem){
	console.log(elem);
	$(elem).find('.closed').css('width', '300px');
}
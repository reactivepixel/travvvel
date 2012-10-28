$(document).ready(function() {
	

	var t 			= new Date(),
		day 		= t.getDate(),
		month		= t.getMonth(),
		year		= t.getFullYear()
		strToday	= year + "-" + month + "-" + day;

	console.log("today", strToday)
	// Returns, e.g., 6/09/07
	
	loadDribbleStream();
	

});

var dataStream,
	imgIndex = 0,
	pageIndex = 1,
	intNext,
	maxPages;

function nextImg(){
	imgData = dataStream.shots[imgIndex]
	var img = $("#gallery").prepend('<img class="closed" src="' + imgData.image_url + '" />');
	setTimeout(openImg(img), 1000);
	imgIndex++;
	if(imgIndex >= dataStream.shots.length){
		imgIndex = 0;
		pageIndex++;
		if(pageIndex > maxPages){
			pageIndex = 0;
		}
		clearInterval(intNext);
		loadDribbleStream();
		return false;
	}
}

function openImg(elem){
	$(elem).find('.closed').css('width', '300px');
}
function loadDribbleStream(){
	var input;
	$.ajax({
		url			: "http://api.dribbble.com/shots/popular/" + strToday + "?page=" + pageIndex,
		dataType	: "jsonp",
		data 		: input,
		success		: function(d){
			console.log('data loaded', d);
			dataStream = d;
			maxPages = dataStream.pages;
			intNext = setInterval(nextImg, 1000);
		},
		error		: function(d){
			console.log("failure", d);
		}
	})
}
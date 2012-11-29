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
	imgIndex 				= 0,
	pageIndex 				= 1,
	intNext					,
	maxPages				,
	aryImgs 				= [],
	durration_on_img 		= 10000,
	durration_of_transition = 1000;

function nextImg(){
	imgData = dataStream.shots[imgIndex]
	aryImgs.push(imgData);

	// transition main img to invis, alter img's src and create UI for main disp, transition this all back to opaque
	var aryInfo 	= 	[
							{"likes" 			: imgData.likes_count },
							{"comments" 		: imgData.comments_count },
							{"views" 			: imgData.views_count }
						]

	var mainImg = $('#mainDisp').transition({ opacity: 0 }, 0)
		.html('<a href="' + imgData.short_url + '"><img src="' + imgData.image_url + '" /></a>')
		.append( aryToUL( aryInfo, "infoList" ) )
		.transition({ opacity: 100 }, durration_of_transition);

	if(aryImgs.length > 1){
		var prevImg = aryImgs[aryImgs.length-2];
		var img = $("#gallery").prepend('<a href="' + prevImg.short_url + '"><img class="closed" src="' + prevImg.image_url + '" />');
	}
	
	setTimeout(openImg(img), durration_on_img);
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
			nextImg();
			intNext = setInterval(nextImg, durration_on_img);
		},
		error		: function(d){
			console.log("failure", d);
		}
	})
}

// Basic Utilities
function aryToUL(ary, className){
	var strReturn = "<ul class='" + className + "''>";
	for(var i = 0; i < ary.length; i++){
		objInner = ary[i];
		for( var key in objInner){
			strReturn += "<li class='" + key + "'>";
			//strReturn += "<span class='title'>" + key + "</span>";
			strReturn += "<span class='value'>" + objInner[key] + "</span>";
			strReturn += "</li>";
		};
	}
	strReturn += "</ul>";
	console.log("str form", strReturn);
	return strReturn;
}
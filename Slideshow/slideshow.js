var slideshow = window.slideshow || {};

$(function() {
	slideshow.length = 5;
	slideshow.imageWidth = 395;
	slideshow.ulObj = $('<ul id="slideshowHolder"></ul>');
	$('#slideShowContainer').append(slideshow.ulObj);
	slideshow.liArray = {};
	for (var i = 1; i <= slideshow.length; i++) {
		slideshow.ulObj.append($('<li id="image'+i+'"><img src="images-slideshow/image'+i+'.jpg"/></li>'));
	}
	slideshow.ulObj.width(slideshow.imageWidth*5);
	$('#slideShowContainer').width(slideshow.imageWidth);
	addSliders();
	
	function addSliders() {
		slideshow.leftSlider = $('<div id="leftSlider"><span class="sliderText"><<</span></div>');
		slideshow.rightSlider = $('<div id="rightSlider"><span class="sliderText">>></span></div>');
		$('#slideShowContainer').append(slideshow.leftSlider);
		$('#slideShowContainer').append(slideshow.rightSlider);
	}
	
	$("#leftSlider").click(function() {
		slideshow.leftClick();
	});
	
	$("#rightSlider").click(function() {
		slideshow.rightClick();
	});
	
	slideshow.leftClick = function() {
		var marginLeft = parseInt(slideshow.ulObj.css("margin-left"));
		if(parseInt(marginLeft) != 0) {
			$("#rightSlider").css({"opacity" : "0.9"});
			$("#leftSlider").hide();
			slideshow.ulObj.animate({"margin-left" : (marginLeft) + slideshow.imageWidth}, "slow", function() {$("#leftSlider").show();});
			if(marginLeft == -slideshow.imageWidth) {
				$("#leftSlider").css({"opacity" : "0.3"});
			}
		}
	}
	
	slideshow.rightClick = function() {
		var marginLeft = parseInt(slideshow.ulObj.css("margin-left"));
		var width = parseInt(slideshow.ulObj.width());
		if(marginLeft != ((width - slideshow.imageWidth) * -1)) {
			$("#leftSlider").css({"opacity" : "0.9"});
			$("#rightSlider").hide();
			slideshow.ulObj.animate({"margin-left" : (marginLeft - slideshow.imageWidth)}, "slow", function() {$("#rightSlider").show();});
			if(marginLeft == (width - (slideshow.imageWidth * 2)) * -1) {
				$("#rightSlider").css({"opacity" : "0.3"});
			}
		}
	}
	
	$("body").keydown(function(e) {
	  if(e.keyCode == 37) { // left
		slideshow.leftClick();
	  } else if(e.keyCode == 39) { // right
		slideshow.rightClick();
	  }
	});
});
		

// Overview

var initNavBtnLeft = function() {
	$(".img-swap-btn").click(function() {
		// Switch page
		idx = $(this).attr("id");
		$(".the-core").hide();
		$(".the-core#page"+idx).show();
		// Deal with color
		$(".nav-btn-right-upper circle").attr("fill","grey");
		$("circle").filter("#"+idx).attr("fill","orange");
	});
}

var initNavBtnRight = function() {
	$(".nav-btn-right-upper circle").click(function() {
		if ( $(this).attr("fill")=="grey" ) {
			// Switch page
			idx = $(this).attr("id");
			$(".the-core").hide();
			$(".the-core#page"+idx).show();
			// Deal with color
			$(".nav-btn-right-upper circle").attr("fill","grey");
			$(this).attr("fill","orange");
		}
	});
};

var initNavBtn = function() {
	initNavBtnLeft();
	initNavBtnRight();
}



// Page01

var movingBall = function(ball, speed) {
	var ball_field = ball.parent();
	var width = parseFloat( ball_field.css('width').split("px")[0] );
	var height = parseFloat( ball_field.css('height').split("px")[0] );

	var x = parseFloat( ball.css('left').split("px")[0] );
	var y = parseFloat( ball.css('top').split("px")[0] );

	// 限制最大变动
	if ( Math.abs(x)>width ) { x=0.42*width; }
	if ( Math.abs(y)>height ) { y=0.12*height; }

	var x_diff = x-0.42*width;
	var y_diff = y-0.12*height;

	var tempFunc = function( rnd ) {
		if (rnd<0.5) {
			return -2.0*rnd;
		} else {
			return 2.0*rnd;
		}
	}

	var step = 0.03;
	var x_delta = step * tempFunc( Math.random() ) * width;
	var y_delta = step * tempFunc( Math.random() ) * height;

	var x = x_delta+x_diff;
	var y = y_delta+y_diff;

	ball.animate(
		{
			left: "-=" + x + "px",
			top: "-=" + y + "px"
		},
		{
			duration: speed,
			complete: function() {
				movingBall($(this), speed);
				// if (ball.parent().parent().parent().parent().is(":visible")) {
				// 	movingBall($(this), speed);
				// }
			}
		}
	);
}

var initNavBtnBall = function() {
	$(".ball").click(function() {
		// Switch page
		idx = $(this).attr("id");
		$(".the-core").hide();
		$(".the-core#page"+idx).show();
		// Deal with color
		$(".nav-btn-right-upper circle").attr("fill","grey");
		$("circle").filter("#"+idx).attr("fill","orange");
	});
}

var initBall = function() {
	initNavBtnBall();
	movingBall($(".ball"), 1000);
}



// Page03

var people = [
	["01", "刘成", "设计师", "MEMORY DESIGN", "小刘成.jpg", "大刘成.jpg"],
	["02", "大爷", "设计师", "MEMORY DESIGN", "小大爷.jpg", "大大爷.jpg"],
	["03", "婷婷", "设计师", "MEMORY DESIGN", "小婷婷.jpg", "大婷婷.jpg"],
	["04", "成昊", "设计师", "MEMORY DESIGN", "小成昊.jpg", "大成昊.jpg"],
	["05", "细心", "设计师", "MEMORY DESIGN", "小细心.jpg", "大细心.jpg"],
	["06", "袁月姐", "设计师", "MEMORY DESIGN", "小袁月姐.jpg", "大袁月姐.jpg"],
	["07", "邱丹", "设计师", "MEMORY DESIGN", "小邱丹.jpg", "大邱丹.jpg"],
	["08", "钉子", "设计师", "MEMORY DESIGN", "小钉子.jpg", "大钉子.jpg"]
];

var initPWP = function() {
	
	var nPeople = people.length;

	for ( i=0; i<nPeople*3; i++ ) {
		$(".page03-figure#ff").clone().appendTo(".page03-picture-frame");
		$($(".page03-figure")[i+1]).attr("id", people[i%nPeople][0]);
		$($(".page03-picture-small")[i+1]).css("background-image", 'url("images/people/' + people[i%nPeople][4] + '")');
		$($(".page03-the-large-picture img")[i+1]).attr("src", "images/people/" + people[i%nPeople][5]);
		$($($(".page03-the-title > div")[i+1]).children()[0]).html(people[i%nPeople][2]);
		$($($(".page03-the-title > div")[i+1]).children()[1]).html(people[i%nPeople][3]);
	}

	var refleshPF = function() {
		$(".page03-figure").css("display", "none");
		for ( i=idx; i<nPeople*3; i++ ) {
			if (i<idx+nFigures) {
				$($(".page03-figure")[i+1]).css("display", "block");
			}
		}
	};

	var nFigures = 5;
	var idx = nPeople;
	refleshPF();

	$("div#prev").click(function() {
		idx -= 1;
		if (idx==1) {
			idx = nPeople;
		}
		refleshPF();
	});
	$("div#next").click(function() {
		idx += 1;
		if (idx==15) {
			idx = nPeople + 1;
		}
		refleshPF();
	});
};



// page04

var cases = [
	["01", "酒店", "design", 5],
	["02", "月安", "design", 6],
	["03", "饭点", "design", 4],
	["04", "云归谷", "design", 6],
	["05", "卤味", "design", 5],
	["06", "煌上煌", "plan", 7],
	["07", "白鹿原", "design", 1]
];

var initCoverPictures = function(nToShow) {
	
	var nCases = cases.length;

	for (i=0; i<nCases; i++) {

		txt = '<div class="col-md-4 page04-picture-frame" id="'+cases[i][0]+'" data-toggle="modal" data-target="#modal" style="display:none;"><img src="images/cases/'+cases[i][1]+'/page04-'+cases[i][1]+'-c.jpg" class="img-responsive"><img src="images/cases/'+cases[i][1]+'/page04-'+cases[i][1]+'-bw.jpg" class="img-responsive"></div>';
		$("#page04-cases").append(txt);

		$($(".page04-picture-frame")[i]).toggleClass(cases[i][2]);

		$($(".page04-picture-frame")[i]).addClass("toShow");
		if ( i<nToShow ) {
			$($(".page04-picture-frame")[i]).show();
		}
	}
}

var initTagControl = function(nToShow) {

	$(".page04-picture-tag").click(function() {

		if ( $(this).css("color")=="rgb(255, 255, 255)" ) {
			
			$(".page04-picture-tag").css("color", "rgb(255, 255, 255)");
			$(this).css("color", "rgb(255, 165, 0)");

			$(".page04-picture-frame").hide();

			$(".page04-picture-frame").removeClass("toShow");
			if ( $(this).attr("id")=="all" ) {

				$(".design").addClass("toShow");
				$(".plan").addClass("toShow");

				var nElements = $(".toShow").length;
				for (i=0; i<nElements; i++) {
					if (i<nToShow) {
						$($(".toShow")[i]).show();
					}
				}
			}
			if ( $(this).attr("id")=="plan" ) {
				$(".plan").addClass("toShow");

				var nElements = $(".toShow").length;
				for (i=0; i<nElements; i++) {
					if (i<nToShow) {
						$($(".toShow")[i]).show();
					}
				}
			}
			if ( $(this).attr("id")=="design" ) {
				$(".design").addClass("toShow");

				var nElements = $(".toShow").length;
				for (i=0; i<nElements; i++) {
					if (i<nToShow) {
						$($(".toShow")[i]).show();
					}
				}
			}
		}
	});
}

var initFlipControl = function(nToShow) {

	// 翻页按钮

	var setHeightFC = function() {

		// Harding coding...
		var yFC = (($(".the-basic-row").width() * 8/12 - 15*2) * 10/12 - 15*2)/3 * 321/424 - 18;
		$(".page04-middle-column#prev div").css("top", yFC);
		$(".page04-middle-column#next div").css("top", yFC);
	}
	setHeightFC();
	$(window).resize(function() {
		setHeightFC();
	});

	// 按钮功能

	var currentFrame = 1;

	$(".page04-middle-column#next").click(function() {

		var nElements = $(".toShow").length;
		var nPicFrames = Math.ceil(nElements/nToShow);

		if ( (currentFrame+1)<=nPicFrames ) {
			currentFrame += 1;
		} else {
			currentFrame = 1;
		}

		$(".page04-picture-frame").hide();
		for (i=(currentFrame-1)*nToShow; i<nElements; i++) {
			if (i<currentFrame*nToShow) {
				$($(".toShow")[i]).show();
			}
		}
	});

	$(".page04-middle-column#prev").click(function() {

		var nElements = $(".toShow").length;
		var nPicFrames = Math.ceil(nElements/nToShow);

		if ( (currentFrame-1)>=1 ) {
			currentFrame -= 1;
		} else {
			currentFrame = nPicFrames;
		}

		$(".page04-picture-frame").hide();
		for (i=(currentFrame-1)*nToShow; i<nElements; i++) {
			if (i<currentFrame*nToShow) {
				$($(".toShow")[i]).show();
			}
		}
	});
}

var initModal = function() {

	$("#page04-cases").append('<div id="modal" class="modal fade" role="dialog"></div>');

	// Using click

	$(".page04-picture-frame").click(function() {
		
		var id = $(this).attr("id");
		var idx = parseInt(id)-1;
		var nPictures = cases[idx][3];
		
		var txt_I = '<ol class="carousel-indicators">';
		var txt_S = '<div class="carousel-inner">';
		for (i=0; i<nPictures; i++) {
			
			if (i==0) {
				txt_I = txt_I + '<li data-target="#carousel" data-slide-to="0" class="active"></li>';
				picture_name = cases[idx][1]+'/page04-'+cases[idx][1]+'-1.jpg';
				txt_S = txt_S + '<div class="item active"><img src="images/cases/'+picture_name+'"></div>';
			} else {
				txt_I = txt_I + '<li data-target="#carousel" data-slide-to="'+i+'"></li>';
				picture_name = cases[idx][1]+'/page04-'+cases[idx][1]+'-'+(i+1).toString()+'.jpg';
				txt_S = txt_S + '<div class="item"><img src="images/cases/'+picture_name+'"></div>';
			}
		}
		txt_I = txt_I + '</ol>';
		txt_S = txt_S + '</div>';

		txt = '<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-body"><div id="carousel" class="carousel slide">'+txt_I+txt_S+'<a class="left carousel-control" href="#carousel" data-slide="prev"><span class="icon-prev"></span></a><a class="right carousel-control" href="#carousel" data-slide="next"><span class="icon-next"></span></a></div></div></div></div>';
		$("#modal").html(txt);
	});
}

var initCases = function(nToShow=6) {
	initCoverPictures(nToShow);
	initTagControl(nToShow);
	initFlipControl(nToShow);
	initModal();
}



// Page05

var demands = [
	["01", "设计师 I", "MEMORY DESIGN", "禁得起压力<br>软件<br>态度<br>负责"],
	["02", "设计师 II", "MEMORY DESIGN", "禁得起压力<br>软件<br>态度<br>负责"],
	["03", "设计师 III", "MEMORY DESIGN", "禁得起压力<br>软件<br>态度<br>负责"],
	["04", "设计师 IV", "MEMORY DESIGN", "禁得起压力<br>软件<br>态度<br>负责"]
];

var initDL = function() {

	nDemands = demands.length;

	for ( i=0; i<nDemands; i++ ) {
		$(".page05-demand#ff").clone().appendTo("#page05-join-us");
		$($(".page05-demand")[i+1]).attr("id", demands[i][0]);
		$($(".page05-demand")[i+1]).show();
		$($($(".page05-frame-01")[i+1]).children()[0]).html( demands[i][1] + "<br>" +  demands[i][2]);
		$($($(".page05-frame-02")[i+1]).children()[1]).html( demands[i][3] );
	}

	$(".page05-btn").click(function() {
		$(this).parent().parent().hide();
		$(this).parent().parent().siblings().show();
	});
};



// Run

$(document).ready(function() {
	// Overview
	initNavBtn();
	// Page One
	initBall();
	// Page Three
	initPWP();
	// Page Four
	initCases();
	// Page Five
	initDL();
});
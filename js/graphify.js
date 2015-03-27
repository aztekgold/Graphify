 $.fn.graphify = function( options ) {

		// Establish our default settings
    	var settings = $.extend({
    		arr: [378,379,311,537,378,115,405,51,130,295,187,655,269,295,559,521,133,665,164,195],
    		backgroundColor: "#323232",
    		xPadding: 80,
    		yPadding: 60
    	}, $.fn.graphify.defaults, options);

    	var arr = settings.arr;

		var max = M.graph.max(arr);
		var min = M.graph.min(arr);
		var xp = settings.xPadding;
		var yp = settings.yPadding
		var range = max - min;
		var width = this.width();
		var height = this.height();
		var xScale = (this.width() - (xp*2)) / (arr.length -1);
		var yScale = (height - (yp *2)) / range;
		var yAxisPoints = 5;
    	
    	var elementId = $(this).attr("id");
		var canvas = document.getElementById(elementId)
		var ctx	= canvas.getContext("2d");

		// Set Background Color
			ctx.fillStyle = settings.backgroundColor;
			ctx.fillRect(0,0,width,height);

		// Label Axis
		// Y Axis
		for (var i = 0; i < yAxisPoints + 1; i++) {
			var x = max / yAxisPoints;
			placeText(19,(height - ((i * x) * yScale)) - yp, x * i,'#aaa')
		};

		// Draw Grid
		for (var i = 0; i < yAxisPoints + 1; i++) {
			var x1 = xp,
				y1 = (height - ((i * x) * yScale)) - yp,
				x2 = width - xp,
				y2 = y1;
			drawLine(x1, y1, x2, y2,'#444')
		};

		// Draw Axis'
			drawLine(xp, yp, xp, height - yp, '#aaa', '#aaa') // Y Axis
			drawLine(xp, height - yp, width - xp, height - yp); // X Axis

		console.log("max = " + max);
		console.log("min = " + min);


		function placeText (x, y, text, color) {
			ctx.fillStyle = color;
			ctx.font = '14px sans-serif';
			ctx.textBaseline = 'bottom';
			ctx.fillText(text, x - 14, y + 14);
		}

		function drawLine(x1, y1, x2, y2, rgba) {
			ctx.beginPath();
			ctx.strokeStyle = rgba;
			ctx.lineWidth = 2;
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		}

		function drawGradLine(x1, y1, x2, y2, rgb1, rgb2) {
			var grad = ctx.createLinearGradient(0, 0, width, 0);
			grad.addColorStop(0, rgb1); //"#F89406"
			grad.addColorStop(1, rgb2); //"#03C9A9"
			ctx.strokeStyle = grad;
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		}


		this.each(function(){
			for (var i = 0; i < arr.length - 1; i++) {
			var	x1 = (i * xScale) + xp,
			 	y1 = (height  - ((arr[i] - min) * yScale)) - yp,
				x2 = ((i+1) * xScale) + xp,
				y2 = (height - ((arr[i+1] - min) * yScale)) - yp;
			drawGradLine(x1, y1, x2, y2, "#F89406", "#03C9A9");
			};
		})

		}
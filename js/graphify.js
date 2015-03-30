 $.fn.graphify = function( options ) {

		// Establish our default settings
    	var settings = $.extend({
    		data: [],
    		backgroundColor: "#323232",
    		xPadding: 80,
    		yPadding: 60,
    		yAxisPoints: 5,
    		gridLineColor: "aaa",
    		lineColors: [["#0af", "#f00"],["#bed123"],["brown"]],
    		axisColor: '#aaa'
    	}, $.fn.graphify.defaults, options);


    	// find Min/Max of all data arrays
    	var testMax = -Infinity, testMin = Infinity; 
    	for (var i = 0; i < settings.data.length; i++) {
    		var dataArrMax = M.graph.max(settings.data[i]),
    			dataArrMin = M.graph.min(settings.data[i]);
    		testMax = (dataArrMax > testMax) ? dataArrMax : testMax;
    		testMin = (dataArrMin < testMin) ? dataArrMin : testMin;
    	}
    	
    	var arr = settings.data[0];
		var max = testMax;
		var min = testMin
		var xp = settings.xPadding;
		var yp = settings.yPadding
		var range = max - min;
		var width = this.width();
		var height = this.height();
		var xScale = (this.width() - (xp*2)) / (arr.length -1);
		var yScale = (height - (yp *2)) / range;
		var yAxisPoints = settings.yAxisPoints;
		var uom = ""; 
		
    	var elementId = $(this).attr("id");
		var canvas = document.getElementById(elementId)
		var ctx	= canvas.getContext("2d");

		// Set Background Color
			ctx.fillStyle = settings.backgroundColor;
			ctx.fillRect(0,0,width,height);

		// Label Axis
		// Y Axis
		for (var i = 0; i < yAxisPoints + 1; i++) {
			var x = xp - 10,
				y = (height - yp) - (i * ((height - 2 * yp) / yAxisPoints)),
				text = min + (i * (range / yAxisPoints));
			placeText(x, y, text+uom, '#aaa')
		};

		// Draw Grid
		for (var i = 0; i < yAxisPoints + 1; i++) {
			var x1 = xp,
				y1 = (height - yp) - (i * ((height - 2 * yp) / yAxisPoints)),
				x2 = width - xp,
				y2 = y1;
			drawLine(x1, y1, x2, y2, settings.gridLineColor)
		};

		// Draw Axis'
			drawLine(xp, yp, xp, height - yp, settings.axisColor) // Y Axis
			drawLine(xp, height - yp, width - xp, height - yp, settings.axisColor); // X Axis

			console.log("max = " + max);
			console.log("min = " + min);
			console.log("range = " + range);



		function placeText (x, y, text, color) {
			ctx.fillStyle = color;
			ctx.font = '14px sans-serif';
			ctx.textBaseline = 'bottom';
			ctx.textAlign = 'right';
			ctx.fillText(text, x, y + 14);
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
			rgb2 = (rgb2 == undefined) ? rgb1 : rgb2;
			var grad = ctx.createLinearGradient(0, 0, width, 0);
			grad.addColorStop(0, rgb1); //"#F89406"
			grad.addColorStop(1, rgb2); //"#03C9A9"
			ctx.strokeStyle = grad;
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.moveTo(x1,y1);
			// ctx.lineTo(x2,y2);
			ctx.bezierCurveTo(x2, y2, x2, y2, x2, y2);
			ctx.stroke();
		}

		// Plot Graph(s)
		for (var z = 0; z < settings.data.length; z++) {
			for (var i = 0; i < settings.data[z].length - 1; i++) {
				var	x1 = (i * xScale) + xp,
			 		y1 = (height  - ((settings.data[z][i] - min) * yScale)) - yp,
					x2 = ((i+1) * xScale) + xp,
					y2 = (height - ((settings.data[z][i+1] - min) * yScale)) - yp;
				drawGradLine(x1, y1, x2, y2, settings.lineColors[z][0], settings.lineColors[z][1]);
			};
		};
		
		}

		
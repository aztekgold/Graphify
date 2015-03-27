// Useful Math Functions

// New Math Object
var M = {
	graph: {},
	array: {}
};

// Used for Calculating y-axis Max label value based on scale
M.graph.max = function (numArr) {
	var max = M.array.max(numArr);
	var yRange = M.array.range(numArr);
	var yPow = Math.pow(10, 1 + Math.floor(Math.log(yRange) / Math.log(10)  -1 ) ) /2;
	return parseFloat((Math.ceil(max / yPow) * yPow).toPrecision(4))
}

// Used for Calculating y-axis Max label value based on scale
M.graph.min = function (numArr) {
	var min = M.array.min(numArr);
	var yRange = M.array.range(numArr);
	var yPow = Math.pow(10, 1 + Math.floor(Math.log(yRange) / Math.log(10)) - 1)  ;
	return parseFloat((Math.floor(min / yPow) * yPow).toPrecision(4)) 
}

// Get Max value from array
M.array.max = function (numArr) {
		return Math.max.apply(null, numArr);
}

// Get Min value from array
M.array.min = function (numArr) {
		return Math.min.apply(null, numArr);
}

// Get Mean of array
M.array.mean = function (numArr) {
	var total = 0;
	for (var i = 0; i < numArr.length; i++) {
		total += numArr[i];
	}
	return total / numArr.length;
}

// Get Range of array
M.array.range = function (numArr) {
 	var max = M.array.max(numArr);
	var min = M.array.min(numArr);
	return max - min;
} 
function noop() {};

var abs, max, min, sin, cos, floor, random;
(function(math) {

	abs = function() { return math.abs.apply(math, arguments); }
	max = function() { return math.max.apply(math, arguments); }
	min = function() { return math.min.apply(math, arguments); }
	sin = function() { return math.sin.apply(math, arguments); }
	cos = function() { return math.cos.apply(math, arguments); }

	floor = function(n) {
		return (n << 0);
	}

	random = function(min, max) {
		if (min == null)
			return math.random();
		else
			return floor(math.random() * (max - min)) + floor(min);
	}

})(Math);

function randomColor() {
	return 'rgb(' +
		random(0, 255) + ',' +
		random(0, 255) + ',' +
		random(0, 255) +
		')';
}

function setBackgroundColor(color) {
	document.documentElement.style.backgroundColor = color;
}

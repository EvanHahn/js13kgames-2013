function noop() {};

function floor(n) {
	return (n << 0);
}

function random(min, max) {
	return floor(Math.random() * (max - min)) + floor(min);
}

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
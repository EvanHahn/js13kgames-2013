// initial variables
// -----------------

var shield = new Shield;

var particles = [];

var points = 0;

var win = window;
var doc = document;
var canvas = doc.getElementById('c');
var context = canvas.getContext('2d');

var screenSize, centerX, centerY;
var updateSizes = function() {
	var width = win.innerWidth;
	var height = win.innerHeight;
	screenSize = Math.min(width, height);
	canvas.width = width;
	canvas.height = height;
	centerX = width / 2;
	centerY = height / 2;
};
win.onresize = updateSizes;
updateSizes();

// initial setup
// -------------

setBackgroundColor(COLOR_BACKGROUND);

// do that update
// --------------

var lastUpdate = new Date;
function update(timestamp) {

	// what's dt?
	var dt = timestamp - lastUpdate;
	lastUpdate = timestamp;

	// drop new particles?
	if ((random(0, 100) === 0) && (shield.health > 0)) {
		particles.push(new Particle);
	}

	// clear canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	// update everyone
	shield.update(dt);
	shield.draw(context);
	var particle;
	for (var i = 0, len = particles.length; i < len; i ++) {
		particle = particles[i];
		if ((particle) && (!particle.destroyed)) {
			particle.update(dt);
			particle.draw(context);
		}
	}

	// start again
	requestAnimationFrame(update);

}

update();

window.particles = particles;

// test sounds
// -----------

var introBloop = new Sound('square');
introBloop.start().tween({
	from: 100,
	to: 300,
	duration: 800,
	then: function() {
		introBloop.stop();
	}
});

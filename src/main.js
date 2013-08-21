// initial variables
// -----------------

var pool = new Pool;

var shield = new Shield;
pool.add(shield);

var points = 0;

var win = window;
var canvas = document.getElementById('c');
var context = canvas.getContext('2d');

// when we resize, change screen-proportion variables
// --------------------------------------------------

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
function update(now) {

	// what's dt?
	var dt = now - lastUpdate;
	lastUpdate = now;

	// drop new bombs?
	if ((random(1, BOMB_ORBIT_LIKELIHOOD) === 1) && (shield.health > 0)) {
		pool.add(new Bomb);
		Bomb.speed += BOMB_SPEED_STEP;
		shield.speed += SHIELD_SPEED_STEP;
	}

	// clear canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	// update everyone
	pool.updateAll(dt, context);

	// start again
	requestAnimationFrame(update);

}

update();

// show a "go go go", which we have to delay for some reason
setTimeout(function() {
	pool.add(new Message('GO GO GO', '0, 0, 0'));
}, 10);

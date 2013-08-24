// initial variables
// -----------------

var mode = 'menu';

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

	// clear canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (mode === 'game') {

		// what's dt?
		var dt = now - lastUpdate;
		lastUpdate = now;

		// drop new bombs?
		if ((random(1, BOMB_ORBIT_LIKELIHOOD) === 1) && (shield.health > 0)) {
			pool.add(new Bomb);
			Bomb.speed += BOMB_SPEED_STEP;
			shield.speed += SHIELD_SPEED_STEP;
		}

		// update everyone
		pool.updateAll(dt, context);

	}

	else if (mode === 'menu') {

		var heartRadius = Math.abs(Math.sin(Date.now() / 1000)) * (screenSize * LOGO_HEART_RADIUS) + (screenSize * LOGO_HEART_RADIUS);
		context.outline({
			fillColor: COLOR_HEART,
			shadowColor: COLOR_HEART,
			shadowBlur: LOGO_HEART_RADIUS * screenSize * 2,
			path: function(context) {
				context.arc(centerX, centerY, heartRadius, 0, twopi * shield.health, false);
			}
		});

		var message = 'ORIGIN';
		context.font = (LOGO_SIZE * screenSize) + 'px ' + MESSAGE_FONT;
		context.fillStyle = LOGO_FILL_COLOR;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.shadowBlur = LOGO_OUTLINE_SIZE * screenSize * 5;
		context.strokeStyle = LOGO_OUTLINE_COLOR;
		context.lineWidth = LOGO_OUTLINE_SIZE * screenSize;
		context.fillText(message, centerX, centerY);
		context.strokeText(message, centerX, centerY);

		context.font = (SUBLOGO_SIZE * screenSize) + 'px ' + MESSAGE_FONT;
		context.textBaseline = 'top';
		context.fillText('hit space', centerX, centerY + (LOGO_SIZE * screenSize / 2));

	}

	// start again
	requestAnimationFrame(update);

}

update();

// show a "go go go", which we have to delay for some reason
setTimeout(function() {
	pool.add(new Message('GO GO GO', '0, 0, 0'));
}, 10);

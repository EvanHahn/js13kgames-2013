// initial variables
// -----------------

var pool = new Pool;

var shield; // because shield is a global, sorry

var win = window;
var canvas = document.getElementById('c');
var context = canvas.getContext('2d');

// when we resize, change screen-proportion variables
// --------------------------------------------------

var screenSize, centerX, centerY;
var updateSizes = function() {
	var width = win.innerWidth;
	var height = win.innerHeight;
	screenSize = min(width, height);
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

	// what's dt?
	var dt = now - lastUpdate;
	lastUpdate = now;

	if (mode.get() === 'game') {

		// drop new bombs?
		if ((random(1, BOMB_ORBIT_LIKELIHOOD) === 1) && (shield.health > 0)) {
			pool.add(new Bomb);
			Bomb.speed += BOMB_SPEED_STEP;
			shield.speed += SHIELD_SPEED_STEP;
		}

		// update everyone
		pool.updateAll(dt, context);

	}

	else if (mode.get() === 'menu') {

		// TODO: make the below LOGO_HEART rather than in-game heart
		// TODO: this is really horrible
		var eq1 = max(sin(now * HEART_BEAT_SCALAR), 0) * screenSize * HEART_UPSCALE * HEART_RADIUS;
		var eq2 = abs(sin(now * HEART_BEAT_SCALAR * 2)) * screenSize * HEART_UPSCALE * HEART_RADIUS;
		var heartRadius = max(eq1 + eq2, HEART_RADIUS * screenSize);

		context.outline({
			fillColor: COLOR_BACKGROUND,
			shadowColor: COLOR_HEART,
			shadowBlur: LOGO_HEART_RADIUS * screenSize * 2,
			path: function(context) {
				context.arc(centerX, centerY, heartRadius, 0, twopi, false);
			}
		});

		var message = 'ORIGIN';
		context.font = (LOGO_SIZE * screenSize) + 'px ' + MESSAGE_FONT;
		context.fillStyle = LOGO_FILL_COLOR;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.shadowBlur = LOGO_OUTLINE_SIZE * screenSize * 5;
		context.shadowColor = LOGO_SHADOW_COLOR;
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

// game mode
// -------------------


var mode = (function() {

	var _mode = 'menu';
	
	return {

		get: function() {
			return _mode;
		},

		set: function(m) {
			_mode = m;
			if (m === 'game') {

				Sound.play({
					type: 'sine',
					from: 200,
					to: 1500,
					duration: 2000
				});

				pool.empty();
				shield = new Shield;
				pool.add(shield);

			}
		}

	};

})();

// if you hit space...
// -------------------

addEventListener('keyup', function(evt) {
	if (mode.get() === 'menu') {
		if (evt.keyCode === 32) {
			mode.set('game');
		}
	}
});

update();

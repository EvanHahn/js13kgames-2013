// utility functions
// -----------------

function noop() {};

function floor(n) {
	return (n << 0);
}

function random(min, max) {
	return floor(Math.random() * (max - min)) + min;
}

function randomColor() {
	return 'rgb(' +
		random(0, 255) + ',' +
		random(0, 255) + ',' +
		random(0, 255) +
		')';
}

function setBackgroundColor(color) {
	doc.documentElement.style.backgroundColor = color;
}

// classes
// -------

var Shield = Entity.extend({

	// constructor
	initialize: function() {

		// super()
		var me = this;
		Entity.prototype.initialize.apply(me, arguments);

		// initial values
		extend(me, {
			health: SHIELD_HEALTH,
			holes: SHIELD_HOLE_COUNT,
			holePercentage: SHIELD_HOLE_PERCENTAGE,
			radius: SHIELD_RADIUS,
			direction: 0,
			rotationSpeed: 0
		});

		// listen to that keyboard
		addEventListener('keydown', function(evt) {
			if (evt.keyCode === KEYCODE_LEFT) {
				me.rotationSpeed = -SHIELD_SPEED;
			} else if (evt.keyCode === KEYCODE_RIGHT) {
				me.rotationSpeed = SHIELD_SPEED;
			}
		});
		addEventListener('keyup', function(evt) {
			if (evt.keyCode === KEYCODE_LEFT) {
				me.rotationSpeed = Math.max(0, me.rotationSpeed);
			} else if (evt.keyCode === KEYCODE_RIGHT) {
				me.rotationSpeed = Math.min(0, me.rotationSpeed);
			}
		});

	},

	// each tick
	update: function(dt) {
		if (this.rotationSpeed)
			this.direction += this.rotationSpeed * dt;
	},

	// draw me
	draw: function(context) {

		// don't do this if we're dead
		if (this.health <= 0)
			return;

		// draw shield
		var solidSize =  twopi * (1 - this.holePercentage) / this.holes;
		var holeSize = twopi * this.holePercentage / this.holes;
		var shieldRadius = this.radius * screenSize;
		for (var i = 0; i < this.holes; i ++) {
			var startAngle = this.direction + (i * (solidSize + holeSize));
			var endAngle = startAngle + solidSize;
			context.fillStyle = COLOR_SHIELD;
			context.beginPath();
			context.arc(centerX, centerY, shieldRadius, startAngle, endAngle, false);
			context.fill();
			context.strokeStyle = COLOR_OUTLINE;
			context.lineWidth = shieldRadius / 15;
			context.beginPath();
			context.arc(centerX, centerY, shieldRadius, startAngle, endAngle, false);
			context.stroke();
		}

		// heart
		var heartRadius = Math.abs(Math.sin(Date.now() / 1000)) * (screenSize * HEART_RADIUS) + (screenSize * .02);
		context.fillStyle = COLOR_HEART;
		context.beginPath();
		context.arc(centerX, centerY, heartRadius, 0, twopi * this.health, false);
		context.fill();
		context.strokeStyle = COLOR_OUTLINE;
		context.lineWidth = HEART_RADIUS * screenSize / 2;
		context.beginPath();
		context.arc(centerX, centerY, heartRadius, 0, twopi * this.health, false);
		context.stroke();

	}

});

var Particle = Entity.extend({

	// constructor
	initialize: function() {

		// super()
		Entity.prototype.initialize.apply(this, arguments);

		// properties
		extend(this, {
			direction: Math.random() * twopi,
			distance: .75,
			orbit: (random(0, PARTICLE_ORBIT_LIKELIHOOD) === 0)
		});

	},

	// each tick
	update: function(dt) {

		// move me
		this.distance -= (PARTICLE_SPEED * dt);
		if (this.orbit) {
			this.direction = (this.direction - (PARTICLE_ORBIT_SPEED * dt)) % twopi;
		}

		// we'll decide whether I should be destroyed
		var destroyMe = false;

		// if I'm in the heart...
		if (this.distance < 0) {
			shield.health -= PARTICLE_DAMAGE;
			destroyMe = true;
			setBackgroundColor(COLOR_WHITE);
			setTimeout(function() {
				setBackgroundColor(COLOR_BACKGROUND);
			}, 100);
		}

		// if I hit the shield...
		else if ((Math.abs(this.distance - shield.radius) < .001) && (shield.health > 0)) {
			var normalized = this.direction + shield.direction;
			while (normalized < 0) {
				normalized += twopi;
			}
			normalized %= twopi;
			destroyMe = normalized > (twopi * shield.holePercentage / shield.holes);
		}

		// should I be destroyed?
		if (destroyMe) {
			this.destroy();
			if (shield.health > 0) {
				points += 1;
			}
		}

	},

	// draw me
	draw: function(context) {

		var particleSize = PARTICLE_RADIUS * screenSize;

		var x = centerX + (Math.cos(this.direction) * (this.distance * screenSize))
		var y = centerY - (Math.sin(this.direction) * (this.distance * screenSize))

		context.fillStyle = randomColor();
		context.beginPath();
		context.arc(x, y, particleSize, 0, twopi, false);
		context.fill();
		context.strokeStyle = COLOR_OUTLINE;
		context.lineWidth = particleSize / 4;
		context.beginPath();
		context.arc(x, y, particleSize, 0, twopi, false);
		context.stroke();

	}

});

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

var Bomb = Entity.extend({

	// constructor
	initialize: function() {

		// super()
		Entity.prototype.initialize.apply(this, arguments);

		// properties
		extend(this, {
			direction: Math.random() * twopi,
			distance: .75,
			orbit: (random(0, BOMB_ORBIT_LIKELIHOOD) === 0),
			speed: Bomb.speed
		});

		// bloop!
		var fromFreq = random(200, 400);
		Sound.play({
			type: random(0, 1) * 4,
			from: fromFreq,
			to: fromFreq + random(200, 300),
			duration: 150
		});

	},

	// each tick
	update: function(dt) {

		// move me
		this.distance -= (this.speed * dt);
		if (this.orbit) {
			this.direction = (this.direction - (BOMB_ORBIT_SPEED * dt)) % twopi;
		}

		// we'll decide whether I should be destroyed
		var destroyMe = false;

		// if I'm in the heart...
		if (this.distance < 0) {
			shield.health -= BOMB_DAMAGE;
			destroyMe = true;
			// setBackgroundColor(COLOR_WHITE);
			setTimeout(function() {
				setBackgroundColor(COLOR_BACKGROUND);
			}, 100);
			Sound.play(BOOM_DATA);
		}

		// if I hit the shield...
		else if ((Math.abs(this.distance - shield.radius) < BOMB_RADIUS) && (shield.health > 0)) {
			var normalized = this.direction + shield.direction;
			while (normalized < 0) {
				normalized += twopi;
			}
			normalized %= (twopi / shield.holes);
			destroyMe = normalized > (twopi * shield.holePercentage / shield.holes);
			if (destroyMe) {
				Sound.play({
					type: random(0, 1) * 4,
					from: random(900, 1000),
					to: random(1200, 1300),
					duration: 150
				});
			}
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

		var particleSize = BOMB_RADIUS * screenSize;

		var x = centerX + (Math.cos(this.direction) * (this.distance * screenSize))
		var y = centerY - (Math.sin(this.direction) * (this.distance * screenSize))

		var color = randomColor();
		context.outline({
			fillColor: color,
			shadowColor: color,
			shadowBlur: particleSize * 1.5,
			path: function(context) {
				context.arc(x, y, particleSize, 0, twopi, false);
			}
		});

	}

});

Bomb.speed = BOMB_INITIAL_SPEED;

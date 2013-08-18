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

		context.outline({
			fillColor: randomColor(),
			outlineColor: COLOR_OUTLINE,
			outlineWidth: particleSize / 4,
			path: function(context) {
				context.arc(x, y, particleSize, 0, twopi, false);
			}
		});

	}

});
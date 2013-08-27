var Bomb = Entity.extend({

	// constructor
	initialize: function() {

		// super()
		Entity.prototype.initialize.apply(this, arguments);

		// properties
		extend(this, {
			direction: random() * twopi,
			distance: .75,
			orbit: (random(0, BOMB_ORBIT_LIKELIHOOD) === 0),
			speed: Bomb.speed
		});

		// bloop!
		Sound.play({
			type: 'sine',
			from: random(500, 2000),
			to: 1,
			duration: 300
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
			Sound.play(BOOM_DATA);
			pool.add(new Message('AW SHIT', '255, 0, 0'));
			shield.combo = 0;
		}

		// if I hit the shield...
		else if ((abs(this.distance - shield.radius) < BOMB_RADIUS) && (shield.health > 0)) {
			var normalized = this.direction + shield.direction;
			while (normalized < 0) {
				normalized += twopi;
			}
			normalized %= (twopi / shield.holes);
			destroyMe = normalized > (twopi * shield.holePercentage / shield.holes);
			if (destroyMe) {
				shield.combo ++;
				if ((shield.combo % 3) === 0)
					pool.add(new Message(shield.combo + ' COMBO', '200, 0, 200'));
				Sound.play({ type: 3, from: 200, to: 1000, duration: 100 });
				Sound.play({ type: 0, from: 1000, to: 200, duration: 100 });
			}
		}

		// should I be destroyed?
		if (destroyMe) {
			this.destroy();
			var hypotenuse = (this.distance - BOMB_RADIUS) * screenSize;
			var x = centerX + (cos(this.direction) * hypotenuse);
			var y = centerY - (sin(this.direction) * hypotenuse);
			for (var i = 0; i < 100; i ++) {
				pool.add(new Particle({
					x: x,
					y: y,
					direction: this.direction + (random() - .5),
					speed: (random() * .05) + .1,
					age: 500
				}));
			}
			if (shield.health > 0) {
				shield.points ++;
			}
		}

	},

	// draw me
	draw: function(context) {

		var bombSize = BOMB_RADIUS * screenSize;

		var x = centerX + (cos(this.direction) * this.distance * screenSize);
		var y = centerY - (sin(this.direction) * this.distance * screenSize);

		var color = randomColor();
		context.outline({
			fillColor: color,
			shadowColor: color,
			shadowBlur: bombSize * 1.5,
			path: function(context) {
				context.arc(
					floor(x), floor(y), floor(bombSize),
					0, twopi, false
				);
			}
		});

	}

});

Bomb.speed = BOMB_INITIAL_SPEED;

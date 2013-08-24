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
			speed: SHIELD_INITIAL_SPEED,
			rotationSpeed: 0,
			combo: 0,
			points: 0
		});

		// listen to that keyboard
		addEventListener('keydown', function(evt) {
			if (evt.keyCode === KEYCODE_LEFT) {
				me.rotationSpeed = -me.speed;
			} else if (evt.keyCode === KEYCODE_RIGHT) {
				me.rotationSpeed = me.speed;
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

	// call when health is less than 0
	dead: (function() {

		var calledAlready = false;

		return function() {
			if (!calledAlready) {
				calledAlready = true;
				setTimeout(function() {
					pool.add(new Message('GAME OVER', '255, 0, 0'));
				}, 1500);
				setTimeout(function() {
					mode.set('menu');
				}, 3000);
			}
		};

	})(),

	// each tick
	update: function(dt) {

		// if I'm dead, go back to the main menu
		if (this.health <= 0)
			this.dead();

		// rotate
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
		context.outline({
			outlineColor: COLOR_CORE_MEMBRANE,
			outlineWidth: 2,
			path: function() {
				context.arc(centerX, centerY, shieldRadius, 0, twopi, false);
			}
		});
		for (var i = 0; i < this.holes; i ++) {
			var startAngle = this.direction + (i * (solidSize + holeSize));
			var endAngle = startAngle + solidSize;
			context.outline({
				outlineColor: COLOR_OUTLINE,
				outlineWidth: shieldRadius / 15,
				shadowColor: COLOR_OUTLINE,
				shadowBlur: shieldRadius / 10,
				path: function(context) {
					context.arc(centerX, centerY, shieldRadius, startAngle, endAngle, false);
				}
			});
		}

		// heart
		var heartRadius = Math.abs(Math.sin(Date.now() / 1000)) * (screenSize * HEART_RADIUS) + (screenSize * HEART_RADIUS);
		context.outline({
			fillColor: COLOR_HEART,
			shadowColor: COLOR_HEART,
			shadowBlur: HEART_RADIUS * screenSize * 2,
			path: function(context) {
				context.arc(centerX, centerY, heartRadius, 0, twopi * shield.health, false);
			}
		});

	}

});

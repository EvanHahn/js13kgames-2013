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
			fillColor: COLOR_CORE,
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
				shadowBlur: 100,
				path: function(context) {
					context.arc(centerX, centerY, shieldRadius, startAngle, endAngle, false);
				}
			});
		}

		// heart
		var heartRadius = Math.abs(Math.sin(Date.now() / 1000)) * (screenSize * HEART_RADIUS) + (screenSize * HEART_RADIUS);
		context.outline({
			fillColor: COLOR_HEART,
			outlineColor: COLOR_HEART,
			shadowColor: COLOR_HEART,
			shadowBlur:HEART_RADIUS * screenSize,
			outlineWidth: HEART_RADIUS * screenSize / 4,
			path: function(context) {
				context.arc(centerX, centerY, heartRadius, 0, twopi * shield.health, false);
			}
		});

	}

});
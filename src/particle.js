var Particle = Entity.extend({

	// constructor
	initialize: function(options) {

		// super()
		var me = this;
		Entity.prototype.initialize.apply(me, arguments);

		// properties
		extend(this, {
			x: options.x || 0,
			y: options.y || 0,
			direction: options.direction || (Math.random() * twopi),
			speed: options.speed || 1,
			color: options.color || randomColor(),
			age: options.age || 1000
		});

		// age
		var age = options.age || 1000;
		setTimeout(function() {
			me.destroy();
		}, age);

	},

	// update
	update: function(dt) {
		this.x += Math.cos(this.direction) * this.speed * dt;
		this.y -= Math.sin(this.direction) * this.speed * dt;
	},

	// draw
	draw: function(context) {
		var x = floor(this.x);
		var y = floor(this.y);
		var size = floor(PARTICLE_SIZE * screenSize);
		context.shadowBlur = 0;
		context.fillStyle = this.color;
		context.fillRect(x, y, size, size);
	}

});

var Message = Entity.extend({

	initialize: function(message, color) {

		// super()
		var me = this;
		Entity.prototype.initialize.apply(me, arguments);

		// save those arguments baby
		extend(this, {
			message: message,
			outlineColor: color || '255, 0, 0',
			alpha: 0,
			fadeSpeed: MESSAGE_FADE_IN_SPEED,
			offset: 0
		})

		// destroy me and fade me out after a spell
		setTimeout(function() {
			me.fadeSpeed *= -1;
		}, 1000);
		setTimeout(function() {
			me.destroy();
		}, 2000);

	},

	update: function(dt) {
		this.alpha = Math.min(this.alpha + dt * this.fadeSpeed, 1);
		this.offset += (dt * MESSAGE_OFFSET_SPEED * screenSize);
	},

	draw: function(context) {
		context.font = (MESSAGE_SIZE * screenSize) + 'px ' + MESSAGE_FONT;
		context.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.shadowBlur = 50;
		context.shadowColor = 'rgb(' + this.outlineColor + ')';
		context.strokeStyle = 'rgba(' + this.outlineColor + ', ' + this.alpha + ')';
		context.strokeText(this.message, centerX, centerY - this.offset);
		context.fillText(this.message, centerX, centerY - this.offset);
	}

});

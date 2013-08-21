var Entity = MiniClass.extend({

	initialize: function() {
		this.destroyed = false;
	},

	destroy: function() {
		this.destroyed = true;
	},

	update: noop,

	draw: noop

});

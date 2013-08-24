var Pool = MiniClass.extend({

	initialize: function() {
		this.entities = [];
		this.length = 0;
	},

	add: function(obj) {
		for (var i = 0; i < this.length; i ++) {
			if (this.entities[i].destroyed) {
				this.entities[i] = obj;
				return;
			}
		}
		this.entities.push(obj);
		this.length ++;
		return;
	},

	empty: function() {
		this.entities.length = 0;
		this.length = 0;
	},

	updateAll: function(dt, context) {
		for (var i = 0; i < this.length; i ++) {
			if (!this.entities[i].destroyed) {
				this.entities[i].update(dt);
				this.entities[i].draw(context);
			}
		}
	}

});

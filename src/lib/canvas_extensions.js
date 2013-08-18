extend(CanvasRenderingContext2D.prototype, {

	outline: function(options) {

		// do configs
		this.fillStyle = options.fillColor;
		this.strokeStyle = options.outlineColor;
		this.lineWidth = options.outlineWidth;

		// do fill
		this.beginPath();
		options.path.call(this, this);
		this.fill();

		// do outline
		this.beginPath();
		options.path.call(this, this);
		this.stroke();
		this.closePath();

	}

});
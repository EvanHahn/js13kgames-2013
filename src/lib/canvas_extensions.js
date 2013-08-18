extend(CanvasRenderingContext2D.prototype, {

	outline: function(options) {

		// do fill
		if (options.fillColor) {
			this.fillStyle = options.fillColor;
			this.beginPath();
			options.path.call(this, this);
			this.fill();
		}

		// do outline
		this.strokeStyle = options.outlineColor;
		this.lineWidth = options.outlineWidth;
		this.beginPath();
		options.path.call(this, this);
		this.stroke();
		this.closePath();

	}

});
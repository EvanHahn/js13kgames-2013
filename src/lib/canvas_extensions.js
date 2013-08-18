extend(CanvasRenderingContext2D.prototype, {

	outline: function(options) {

		// do I need to blur
		if (options.shadowBlur) {
			this.shadowOffsetX = 0;
			this.shadowOffsetY = 0;
			this.shadowBlur = options.shadowBlur;
			this.shadowColor = options.shadowColor;
		} else {
			this.shadowBlur = 0;
		}

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
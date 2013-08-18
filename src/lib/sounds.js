var Sound;

try {

	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	Sound = MiniClass.extend({

		initialize: function(type) {
			this.context = new AudioContext;
			this.oscillator = this.context.createOscillator();
			this.oscillator.connect(this.context.destination);
			this.oscillator.type = ({
				sine: 0,
				square: 1,
				sawtooth: 2,
				triangle: 3
			})[type];
		},

		start: function() {
			this.oscillator.noteOn(0);
			return this;
		},

		stop: function() {
			this.oscillator.noteOff(0);
			return this;
		},

		tween: function(options) {
			var STEP_TIME = 10;
			var me = this;
			var stepSize = (options.to - options.from) / STEP_TIME;
			me.oscillator.frequency.value = options.from;
			var interval = setInterval(function() {
				me.oscillator.frequency.value += stepSize;
			}, STEP_TIME);
			setTimeout(function() {
				me.stop();
				options.then();
			}, options.duration);
		}

	});

	Sound.isSupported = true;

} catch (e) {

	Sound = MiniClass.extend({
		initialize: noop,
		start: noop,
		stop: noop,
		tween: noop
	});

	Sound.isSupported = false;

}

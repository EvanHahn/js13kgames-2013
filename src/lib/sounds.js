window.AudioContext = window.AudioContext || window.webkitAudioContext;

var Sound = MiniClass.extend({

	initialize: function(options) {

		// set up oscillator
		this.context = new AudioContext;
		this.oscillator = this.context.createOscillator();
		this.oscillator.connect(this.context.destination);

		// set up options
		this.options = options;

	},

	play: function(options) {

		// maintain a reference to me
		var me = this;
		var options = options || me.options;

		// type?
		me.oscillator.type = ({
			sine: 0,
			square: 1,
			sawtooth: 2,
			triangle: 3
		})[options.type || 'sine'];

		// from? to? duration?
		var from = options.from || 440;
		var to = options.to || from;
		var duration = options.duration || 100;

		// start initial frequency
		me.oscillator.frequency.value = from;
		me.oscillator.noteOn(0);

		// what's our tweening look like?
		var STEP_TIME = 10;
		var stepSize = (to - from) / STEP_TIME;

		// do the tweening
		var interval = setInterval(function() {
			me.oscillator.frequency.value += stepSize;
		}, STEP_TIME);

		// stop the tweening
		setTimeout(function() {
			me.oscillator.noteOff(0);
			clearInterval(interval);
		}, duration);

	}

});
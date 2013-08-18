window.AudioContext = window.AudioContext || window.webkitAudioContext;

var Sound = {
	muted: false,
	isSupported: !!window.AudioContext
};

Sound.play = (function() {

	// configs
	var STEP_TIME = 10;
	var OSCILLATOR_TYPES = {
		sine: 0,
		square: 1,
		sawtooth: 2,
		triangle: 3
	};

	// make our master context
	// sadly, there can only be one
	var context;
	if (Sound.isSupported)
		context = new AudioContext;

	return function playSound(options) {

		// bail, bail!
		if (Sound.muted || (!Sound.isSupported))
			return;

		// this whole thing is in a try/catch because not everything
		// supports this stuff
		try {

			// make me an oscillator
			var oscillator = context.createOscillator();
			oscillator.connect(context.destination);

			// parse the options
			var type = options.type || 0;
			var from = options.from || 440;
			var to = options.to || from;
			var duration = options.duration || 100;

			// type?
			// this isn't robust but screw it
			if (typeof type === 'number')
				oscillator.type = type;
			else if (typeof type === 'string')
				oscillator.type = OSCILLATOR_TYPES[type];

			// start initial frequency
			oscillator.frequency.value = from;
			oscillator.noteOn(0);

			// what's our tweening look like?
			var stepSize = (to - from) / STEP_TIME;

			// do the tweening
			var interval = setInterval(function() {
				oscillator.frequency.value += stepSize;
			}, STEP_TIME);

			// stop this noise
			setTimeout(function() {
				isPlaying = false;
				oscillator.noteOff(0);
				oscillator.disconnect();
				clearInterval(interval);
			}, duration);

		} catch (e) {}

	};

})();
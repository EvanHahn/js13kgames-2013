var COLOR_WHITE = '#ffffff';
var COLOR_BLACK = '#000000';

var COLOR_BACKGROUND = '#121011';
var COLOR_SHIELD = '#373536';
var COLOR_HEART = 'rgb(255,0,40)';
var COLOR_CORE = '#111111';
var COLOR_CORE_MEMBRANE = COLOR_SHIELD;
var COLOR_OUTLINE = COLOR_WHITE;

var PARTICLE_RADIUS = .03; // as % of scren size
var PARTICLE_INITIAL_SPEED = .0001; // as % of scren size
var PARTICLE_SPEED_STEP = .000001;
var PARTICLE_ORBIT_SPEED = .0005;
var PARTICLE_DAMAGE = .05;
var PARTICLE_ORBIT_LIKELIHOOD = 100; // 1 in X chance for this to happen

var HEART_RADIUS = .04; // as % of screen size, fluctuates
var SHIELD_HEALTH = 1;
var SHIELD_HOLE_COUNT = 3;
var SHIELD_HOLE_PERCENTAGE = .5;
var SHIELD_RADIUS = .25;
var SHIELD_INITIAL_SPEED = .002;
var SHIELD_SPEED_STEP = .00001;

var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;

var pi = Math.PI;
var twopi = pi * 2;

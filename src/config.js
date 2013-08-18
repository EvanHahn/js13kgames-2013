var COLOR_BACKGROUND = 'rgb(20,20,80)';
var COLOR_SHIELD = 'rgb(255,108,255)';
var COLOR_HEART = 'rgb(255,0,40)';
var COLOR_OUTLINE = '#000000';
var COLOR_WHITE = '#ffffff';

var PARTICLE_RADIUS = .03; // as % of scren size
var PARTICLE_SPEED = .0001; // as % of scren size
var PARTICLE_ORBIT_SPEED = .0005;
var PARTICLE_DAMAGE = .05;
var PARTICLE_ORBIT_LIKELIHOOD = 5; // 1 in X chance for this to happen

var HEART_RADIUS = .02; // as % of screen size, fluctuates
var SHIELD_HEALTH = 1;
var SHIELD_HOLE_COUNT = 3;
var SHIELD_HOLE_PERCENTAGE = .5;
var SHIELD_RADIUS = .25;
var SHIELD_SPEED = .008;

var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;

var pi = Math.PI;
var twopi = pi * 2;

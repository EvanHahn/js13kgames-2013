var COLOR_WHITE = '#ffffff';
var COLOR_BLACK = '#000000';

var COLOR_BACKGROUND = '#121011';
var COLOR_SHIELD = '#373536';
var COLOR_HEART = 'rgb(255,0,40)';
var COLOR_CORE = '#111111';
var COLOR_CORE_MEMBRANE = COLOR_SHIELD;
var COLOR_OUTLINE = COLOR_WHITE;

var BOMB_RADIUS = .03; // as % of scren size
var BOMB_INITIAL_SPEED = .0001; // as % of screen size
var BOMB_SPEED_STEP = .000003;
var BOMB_ORBIT_SPEED = .0005;
var BOMB_DAMAGE = .05;
var BOMB_ORBIT_LIKELIHOOD = 100; // 1 in X chance for this to happen

var HEART_RADIUS = .04; // as % of screen size, fluctuates
var HEART_UPSCALE = 1.1; // how much bigger can it get when it's beating?
var HEART_BEAT_SCALAR = .001;

var SHIELD_HEALTH = 1;
var SHIELD_HOLE_COUNT = 3;
var SHIELD_HOLE_PERCENTAGE = .5;
var SHIELD_RADIUS = .25;
var SHIELD_INITIAL_SPEED = .002;
var SHIELD_SPEED_STEP = .00002;

var MESSAGE_SIZE = .1; // as % of screen size
var MESSAGE_FONT = 'Impact, sans-serif';
var MESSAGE_OUTLINE_SIZE = .01;
var MESSAGE_FADE_IN_SPEED = .005;
var MESSAGE_OFFSET_SPEED = .0001;

var LOGO_SIZE = .3; // as % of screen size
var LOGO_OUTLINE_SIZE = .005; // as % of screen size
var LOGO_FILL_COLOR = 'transparent';
var LOGO_OUTLINE_COLOR = COLOR_HEART;
var LOGO_SHADOW_COLOR = COLOR_BLACK;
var LOGO_HEART_RADIUS = .05;

var SUBLOGO_SIZE = .05; // as % of screen size
var SUBLOGO_FILL_COLOR = 'red';

var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;

var MAX_HIGHSCORES = 10;

var pi = Math.PI;
var twopi = pi * 2;

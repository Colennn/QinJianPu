(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("codemirror"));
	else if(typeof define === 'function' && define.amd)
		define(["codemirror"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("codemirror")) : factory(root["CodeMirror"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* Codemirror mode for musje 123 notation */

	var CodeMirror = __webpack_require__(1);

	CodeMirror.defineSimpleMode('musje', {
	  start: [
	    { regex: /<<[\u0020-\uffff]*>>.*/, token: 'head' },
	    { regex: /\d+\/\d+/, token: 'time', },
	    { regex: /(?:#{1,2}|b{1,2}|n)(?=[1-7])/, token: 'note accidental' },
	    { regex: /0/, token: 'note', next: 'duration' },
	    { regex: /[1-7]/, token: 'note', next: 'octave' },
	    { regex: /\((?=[1-7#bn])/, token: 'slur' },
	    { regex: /\|\||:\|:|:\||\|:|\|\]/, token: 'bar bar-heavy' },
	    { regex: /\|/, token: 'bar' },
	    { regex: /\\(?:[a-zA-Z<>!]+|\d{1,2}=\d{1,3})/, token: 'direction-down' },
	    { regex: /\/(?:[a-zA-Z<>!]+|\d{1,2}\.{0,2}=\d{1,3}|\[[\d,]?|\])/, token: 'direction-up' },
	    { regex: / +-.*/, token: 'error' },
	    { regex: /-.*/, token: 'part-head' },
	    { regex: /\w[\w_\- ]*/, token: 'lyric' },
	    { regex: /\/\/.*/, token: 'comment' },
	    { regex: /\/\*/, token: 'comment', next: 'comment' },
	    { regex: /[^ \n]/, token: 'error' }
	  ],
	  octave: [
	    { regex: /'+/, token: 'note octave-up', next: 'duration' },
	    { regex: /,+/, token: 'note octave-down', next: 'duration' },
	    { regex: /(?=(.))/, next: 'duration' }
	  ],
	  duration: [
	    { regex: / *\- *\- *\- */, token: 'note', next: 'dotCenter' },
	    { regex: / *\- */, token: 'note', next: 'dotCenter' },
	    { regex: /_/, token: 'note dur-underbar', next: 'dot' },
	    { regex: /=+/, token: 'note dur-equal', next: 'afterEqual' },
	    { regex: /(?=(.))/, next: 'dot' }
	  ],
	  afterEqual: [
	    { regex: /_/, token: 'note dur-underbar', next: 'dot' },
	    { regex: /(?=(.))/, next: 'dot' }
	  ],
	  dot: [
	    { regex: /\.{1,2}/, token: 'note dot', next: 'slurEnd' },
	    { regex: /(?=(.))/, next: 'slurEnd' }
	  ],
	  dotCenter: [
	    { regex: /\.{1,2}/, token: 'note dot-center', next: 'slurEnd' },
	    { regex: /(?=(.))/, next: 'slurEnd' }
	  ],
	  slurEnd: [
	    { regex: /\)/, token: 'slur', next: 'tie' },
	    { regex: /(?=(.))/, next: 'tie' }
	  ],
	  tie: [
	    { regex: /~/, token: 'tie', next: 'start' },
	    { regex: /(?=(.))/, next: 'start' }
	  ],
	  comment: [
	    { regex: /.*?\*\//, token: 'comment', next: 'start'},
	    { regex: /.*/, token: 'comment'}
	  ],
	  // The meta property contains global information about the mode. It
	  // can contain properties like lineComment, which are supported by
	  // all modes, and also directives like dontIndentStates, which are
	  // specific to simple modes.
	  meta: {
	    dontIndentStates: ['comment'],
	    lineComment: '//'
	  }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bundle.css";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('hello world');

var formatTime = function formatTime(time, filler) {
    if (time > 9) return "" + time;
    return (filler ? filler : "0") + "" + time;
};

var setVisibility = function setVisibility(id, visible) {
    var display = visible ? 'block' : 'none';
    document.getElementById(id).style.display = display;
};

var addMedal = function addMedal(name) {
    var img = document.createElement("img");
    img.src = 'img/' + name + '.png';
    img.className = 'medal';
    img.addEventListener("animationend", function () {
        img.remove();
    }, false);
    document.getElementById('medals').appendChild(img);
};

var TIMEOUT = 3000;

var Game = {
    _resetState: function _resetState() {
        Game._state = {
            answer: undefined,
            answers: [],
            timer: undefined,
            timerElem: document.getElementById('timer'),
            medals: {}
        };
    },

    _medal: function _medal() {
        var answers = Game._state.answers;
        if (answers.length == 1) {
            addMedal('firstblood');
        }
        if (answers.length % 2 == 0) {
            addMedal('impressive');
        }
        if (TIMEOUT - answers[answers.length - 1] < 500) {
            addMedal('diehard');
        }
        if (answers[answers.length - 1] < 500) {
            addMedal('headshot');
        }
    },

    timedOut: function timedOut() {
        var now = new Date().getTime() - Game._state.timer;
        if (now >= TIMEOUT) {
            Game.end();
        } else {
            Game._state.timerElem.style.width = 100 - now / TIMEOUT * 100 + "%";
            Game._state.timeout = setTimeout(Game.timedOut, 1);
        }
    },

    round: function round() {
        if (Game._state.timeout) {
            clearTimeout(Game._state.timeout);
        }

        var time = Math.round(Math.random() * 60) % 60;
        Game._state.answer = (time + 30) % 60;
        document.getElementById('time').innerHTML = formatTime(time);
        var _arr = [0, 1, 2, 3, 4, 5];
        for (var _i = 0; _i < _arr.length; _i++) {
            var i = _arr[_i];
            var second = Math.floor(time % 10);
            document.getElementById('box' + i).innerHTML = formatTime(second, i);
        }
        Game._state.timer = new Date().getTime();
        Game._state.timeout = setTimeout(Game.timedOut, 1);
    },

    answer: function answer(event) {
        var answer = Number.parseInt(event.target.innerHTML);
        var correct = Game._state.answer === answer;
        if (correct) {
            Game._state.answers.push(new Date().getTime() - Game._state.timer);
            Game._medal();
            Game.round();
        } else {
            clearTimeout(Game._state.timeout);
            Game.end();
        }
    },

    end: function end() {
        setVisibility('game', false);
        setVisibility('end', true);
        document.getElementById('correct').innerHTML = Game._state.answers.length;
        if (Game._state.answers.length) {
            document.getElementById('average').innerHTML = Math.round(Game._state.answers.reduce(function (a, b) {
                return a + b;
            }) / Game._state.answers.length);
        } else {
            document.getElementById('average').innerHTML = 0;
        }
    },

    start: function start() {
        setVisibility('intro', false);
        setVisibility('end', false);
        setVisibility('game', true);
        Game._resetState();
        Game.round();
    }
};

document.getElementById('start').addEventListener('mousedown', Game.start);
document.getElementById('restart').addEventListener('mousedown', Game.start);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = document.querySelectorAll('.box')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var box = _step.value;

        box.addEventListener('mousedown', Game.answer);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

/***/ })
/******/ ]);
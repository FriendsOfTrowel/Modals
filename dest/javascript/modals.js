(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TrowelModals", [], factory);
	else if(typeof exports === 'object')
		exports["TrowelModals"] = factory();
	else
		root["TrowelModals"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrowelModals = function TrowelModals(elements) {
  _classCallCheck(this, TrowelModals);

  elements.forEach(function (element, index) {
    var element_obj = new TrowelModal(element);
  });
};

exports.default = TrowelModals;

var TrowelModal = function () {
  function TrowelModal(element) {
    _classCallCheck(this, TrowelModal);

    this.element = element;
    this.dialog = this.element.children[0];
    this.rootNodes = [this.element, this.dialog];

    this.hideTriggers = [].slice.call(this.element.querySelectorAll('[data-modal="hide"]'));
    this.showTriggers = [].slice.call(document.querySelectorAll('[data-modal="open"][data-target="#' + this.element.id + '"]'));

    this.events = this.events();
    this.listener();
    this.element.dispatchEvent(this.events.mounted);
    return;
  }

  _createClass(TrowelModal, [{
    key: 'isVisible',
    value: function isVisible() {
      return this.element.getAttribute('data-modal') === 'visible';
    }
  }, {
    key: 'show',
    value: function show() {
      this.element.dispatchEvent(this.events.show);
      this.rootNodes.map(function (node) {
        return node.setAttribute('data-modal', 'visible');
      });
      this.element.dispatchEvent(this.events.shown);
      return;
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.element.dispatchEvent(this.events.hide);
      this.rootNodes.map(function (node) {
        return node.setAttribute('data-modal', 'invisible');
      });
      this.element.dispatchEvent(this.events.hidden);
      return;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.element.dispatchEvent(this.events.toggle);
      this.isVisible() ? this.hide() : this.show();
      this.element.dispatchEvent(this.events.toggled);
      return;
    }
  }, {
    key: 'backdropClose',
    value: function backdropClose(event) {
      // make sure the click event is on the modal and not dom children element
      if (event.currentTarget === event.target) this.hide();

      return;
    }
  }, {
    key: 'events',
    value: function events() {
      var show = new Event('trowel.modal.show');
      var shown = new Event('trowel.modal.shown');
      var hide = new Event('trowel.modal.hide');
      var hidden = new Event('trowel.modal.hidden');
      var toggle = new Event('trowel.modal.toggle');
      var toggled = new Event('trowel.modal.toggled');
      var mounted = new Event('trowel.modal.mounted');

      return { show: show, shown: shown, hide: hide, hidden: hidden, toggle: toggle, toggled: toggled, mounted: mounted };
    }
  }, {
    key: 'listener',
    value: function listener() {
      var _this = this;

      this.element.addEventListener('click', this.backdropClose.bind(this));
      this.hideTriggers.map(function (hideTrigger) {
        return hideTrigger.addEventListener('click', _this.backdropClose.bind(_this));
      });
      this.showTriggers.map(function (showTrigger) {
        return showTrigger.addEventListener('click', _this.show.bind(_this));
      });

      return;
    }
  }]);

  return TrowelModal;
}();

module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=modals.js.map
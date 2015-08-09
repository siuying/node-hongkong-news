'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nightmare = require('nightmare');

var _nightmare2 = _interopRequireDefault(_nightmare);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var BaseScraper = (function () {
  function BaseScraper() {
    _classCallCheck(this, BaseScraper);
  }

  _createClass(BaseScraper, [{
    key: 'nightmare',
    value: function nightmare() {
      // for linux, use the bundled binary
      if (_os2['default'].platform() == 'linux') {
        return new _nightmare2['default']({
          phantomPath: _path2['default'].join(__dirname, '../bin') + '/'
        });
      }

      // otherwise use installed binary
      return new _nightmare2['default']();
    }
  }]);

  return BaseScraper;
})();

exports.BaseScraper = BaseScraper;
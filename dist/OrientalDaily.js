'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseScraper2 = require('./BaseScraper');

var OrientalDaily = (function (_BaseScraper) {
  _inherits(OrientalDaily, _BaseScraper);

  function OrientalDaily() {
    _classCallCheck(this, OrientalDaily);

    _get(Object.getPrototypeOf(OrientalDaily.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(OrientalDaily, [{
    key: 'list',
    value: function list(done) {
      var results = null;
      this.nightmare().goto("http://orientaldaily.on.cc/").evaluate(function () {
        // use Array.prototype.slice to convert NodeList into array
        // then convert the nodes into data
        // then filter the non-null links
        return Array.prototype.slice.call(document.querySelectorAll('#articleListSELECT option')).filter(function (a) {
          return a.getAttribute("value") && a.getAttribute("value").indexOf("/") > -1;
        }).map(function (a) {
          return { title: a.textContent.trim(), href: 'http://orientaldaily.on.cc' + a.getAttribute("value") };
        }).filter(function (a) {
          return a.href && a.href.indexOf("/") > -1;
        });
      }, function (links) {
        results = links;
      }).run(function (err, nightmare) {
        if (err) {
          done(err);
          return;
        }
        done(null, results);
      });
    }
  }, {
    key: 'news',
    value: function news(url, done) {
      var results = null;
      this.nightmare().goto(url).evaluate(function () {
        function getInnerText(selector) {
          var sel = window.getSelection();
          sel.selectAllChildren(document.querySelector(selector));
          var content = "" + sel;
          sel.removeAllRanges();
          return content;
        }

        var title = document.querySelector("h1").textContent.trim();
        var html = document.querySelector("#contentCTN-top").innerHTML + document.querySelector("#contentCTN-right").innerHTML;
        var url = encodeURI(document.location);
        var content = getInnerText("#contentCTN-top") + "\n" + getInnerText("#contentCTN-right");
        var image = document.querySelector("#contentCTN .photo img");
        var imageUrl = image ? 'http://orientaldaily.on.cc' + image.getAttribute('src') : null;
        return {
          source: 'orientaldaily',
          url: url,
          title: title,
          html: html,
          content: content,
          image_url: imageUrl
        };
      }, function (docs) {
        results = docs;
      }).run(function (err, nightmare) {
        if (err) {
          done(err);
          return;
        }
        done(null, results);
      });
    }
  }]);

  return OrientalDaily;
})(_BaseScraper2.BaseScraper);

exports['default'] = OrientalDaily;
module.exports = exports['default'];
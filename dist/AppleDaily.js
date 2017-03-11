'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseScraper2 = require('./BaseScraper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppleDaily = function (_BaseScraper) {
  _inherits(AppleDaily, _BaseScraper);

  function AppleDaily() {
    _classCallCheck(this, AppleDaily);

    return _possibleConstructorReturn(this, (AppleDaily.__proto__ || Object.getPrototypeOf(AppleDaily)).apply(this, arguments));
  }

  _createClass(AppleDaily, [{
    key: 'list',
    value: function list() {
      return this.nightmare().goto('http://hk.apple.nextmedia.com/').wait('#article_ddl').evaluate(function () {
        // use Array.prototype.slice to convert NodeList into array
        // then convert the nodes into data
        // then filter the non-null links
        return Array.prototype.slice.call(document.querySelectorAll('#article_ddl option')).map(function (a) {
          return { title: a.textContent.trim(), link: a.getAttribute("value") };
        }).filter(function (a, idx) {
          return a.link && a.link.indexOf("http:") > -1;
        });
      }).end();
    }
  }, {
    key: 'news',
    value: function news(url) {
      return this.nightmare().goto(url).wait('#masterContent').evaluate(function () {
        var getInnerText = function getInnerText(selector) {
          var sel = window.getSelection();
          sel.selectAllChildren(document.querySelector(selector));
          var content = "" + sel;
          sel.removeAllRanges();
          return content;
        };

        var title = document.querySelector("#articleContent h1").textContent.trim();
        var html = document.querySelector("#masterContent").innerHTML;
        var url = document.location.href;
        var content = getInnerText("#masterContent");
        var image = document.querySelector("meta[property=\"og:image\"]");
        var imageUrl = image ? image.getAttribute('content') : null;
        return {
          source: 'appledaily',
          url: url,
          title: title,
          html: html,
          content: content,
          image_url: imageUrl
        };
      }).end();
    }
  }]);

  return AppleDaily;
}(_BaseScraper2.BaseScraper);

exports.default = AppleDaily;
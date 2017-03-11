'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseScraper2 = require('./BaseScraper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mingpao = function (_BaseScraper) {
  _inherits(Mingpao, _BaseScraper);

  function Mingpao() {
    _classCallCheck(this, Mingpao);

    return _possibleConstructorReturn(this, (Mingpao.__proto__ || Object.getPrototypeOf(Mingpao)).apply(this, arguments));
  }

  _createClass(Mingpao, [{
    key: 'list',
    value: function list() {
      return this.nightmare().goto("http://news.mingpao.com/pns/%E6%96%B0%E8%81%9E%E7%B8%BD%E8%A6%BD/web_tc/archive/latest").wait('#maincontent .list1').evaluate(function () {
        return Array.prototype.slice.call(document.querySelectorAll('.listing ul li a')).map(function (a) {
          return { title: a.text.trim(), link: a.href };
        }).filter(function (a, idx) {
          return a.link && a.link.indexOf("http:") > -1;
        });
      }).end();
    }
  }, {
    key: 'news',
    value: function news(url) {
      return this.nightmare().goto(url).wait("article #upper") // wait for the content to load
      .evaluate(function () {
        function getInnerText(selector) {
          var sel = window.getSelection();
          sel.selectAllChildren(document.querySelector(selector));
          var content = "" + sel;
          sel.removeAllRanges();
          return content;
        }

        var title = document.querySelector("h1").innerHTML;
        var html = document.querySelector("article").innerHTML;
        var url = document.location.href;
        var content = getInnerText("article");
        var image = document.querySelector("meta[property=\"og:image\"]");
        var imageUrl = image ? image.getAttribute('content') : null;

        return {
          source: 'mingpao',
          url: url,
          title: title,
          html: html,
          content: content,
          image_url: imageUrl
        };
      }).end();
    }
  }]);

  return Mingpao;
}(_BaseScraper2.BaseScraper);

exports.default = Mingpao;
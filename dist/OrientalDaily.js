"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseScraper2 = require("./BaseScraper");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrientalDaily = function (_BaseScraper) {
  _inherits(OrientalDaily, _BaseScraper);

  function OrientalDaily() {
    _classCallCheck(this, OrientalDaily);

    return _possibleConstructorReturn(this, (OrientalDaily.__proto__ || Object.getPrototypeOf(OrientalDaily)).apply(this, arguments));
  }

  _createClass(OrientalDaily, [{
    key: "list",
    value: function list() {
      return this.nightmare().goto("http://orientaldaily.on.cc/").wait("#articleListSELECT").evaluate(function () {
        // use Array.prototype.slice to convert NodeList into array
        // then convert the nodes into data
        // then filter the non-null links
        return Array.prototype.slice.call(document.querySelectorAll('#articleListSELECT option')).filter(function (a) {
          return a.getAttribute("value") && a.getAttribute("value").indexOf("/") > -1;
        }).map(function (a) {
          return { title: a.textContent.trim(), link: 'http://orientaldaily.on.cc' + a.getAttribute("value") };
        }).filter(function (a) {
          return a.link && a.link.indexOf("/") > -1;
        });
      }).end();
    }
  }, {
    key: "news",
    value: function news(url) {
      return this.nightmare().goto(url).wait("#contentCTN-right").evaluate(function () {
        function getInnerText(selector) {
          var sel = window.getSelection();
          sel.selectAllChildren(document.querySelector(selector));
          var content = "" + sel;
          sel.removeAllRanges();
          return content;
        }

        var title = document.querySelector("h1").textContent.trim();
        var html = document.querySelector("#contentCTN-top").innerHTML + document.querySelector("#contentCTN-right").innerHTML;
        var url = document.location.href;
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
      }).end();
    }
  }]);

  return OrientalDaily;
}(_BaseScraper2.BaseScraper);

exports.default = OrientalDaily;
import {BaseScraper} from './BaseScraper'

export default class AppleDaily extends BaseScraper {
  list() {
    return this.nightmare()
      .goto('http://hk.apple.nextmedia.com/')
      .wait('#article_ddl')
      .evaluate(function () {
        // use Array.prototype.slice to convert NodeList into array
        // then convert the nodes into data
        // then filter the non-null links
        return Array.prototype.slice.call(document.querySelectorAll('#article_ddl option'))
          .map((a) => ({title: a.textContent.trim(), link: a.getAttribute("value")}))
          .filter((a, idx) => a.link && a.link.indexOf("http:") > -1)
      })
      .end()
  }

  news(url) {
    return this.nightmare()
      .goto(url)
      .wait('#masterContent')
      .evaluate(function () {
        var getInnerText = function (selector) {
          var sel = window.getSelection()
          sel.selectAllChildren(document.querySelector(selector))
          var content = "" + sel
          sel.removeAllRanges()
          return content
        }

        var title = document.querySelector("#articleContent h1").textContent.trim()
        var html = document.querySelector("#masterContent").innerHTML
        var url = document.location.href
        var content = getInnerText("#masterContent")
        var image = document.querySelector("meta[property=\"og:image\"]")
        var imageUrl = image ? image.getAttribute('content') : null
        return {
          source: 'appledaily',
          url: url,
          title: title,
          html: html,
          content: content,
          image_url: imageUrl
        }
      })
      .end()
  }
}

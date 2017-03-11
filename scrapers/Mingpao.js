import {BaseScraper} from './BaseScraper'

export default class Mingpao extends BaseScraper {
  list() {
    return this.nightmare()
      .goto("http://news.mingpao.com/pns/%E6%96%B0%E8%81%9E%E7%B8%BD%E8%A6%BD/web_tc/archive/latest")
      .wait('#maincontent .list1')
      .evaluate(() => {
        return Array.prototype.slice.call(document.querySelectorAll('.listing ul li a'))
          .map((a) => ({title: a.text.trim(), link: a.href}))
          .filter((a, idx) => a.link && a.link.indexOf("http:") > -1)
      })
      .end()
  }

  news(url) {
    return this.nightmare()
      .goto(url)
      .wait("article #upper") // wait for the content to load
      .evaluate(() => {
        function getInnerText(selector) {
          var sel = window.getSelection()
          sel.selectAllChildren(document.querySelector(selector))
          var content = "" + sel
          sel.removeAllRanges()
          return content
        }

        var title = document.querySelector("h1").innerHTML
        var html = document.querySelector("article").innerHTML
        var url = document.location.href
        var content = getInnerText("article")
        var image = document.querySelector("meta[property=\"og:image\"]")
        var imageUrl = image ? image.getAttribute('content') : null

        return {
          source: 'mingpao',
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

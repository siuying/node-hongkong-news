import {BaseScraper} from './BaseScraper'

export default class Mingpao extends BaseScraper {
  list(done) {
    var results = null
    this.nightmare()
      .goto("http://news.mingpao.com/pns/%E6%96%B0%E8%81%9E%E7%B8%BD%E8%A6%BD/web_tc/archive/latest")
      .evaluate(function () {
        return Array.prototype.slice.call(document.querySelectorAll('.listing ul li a'))
          .map((a) => ({title: a.text.trim(), link: a.href}))
          .filter((a, idx) => a.link && a.link.indexOf("http:") > -1)
      }, function(links) {
        results = links
      })
      .run(function(err, nightmare){
        if (err) {
          done(err)
          return
        }
        done(null, results)
      })
  }

  news(url, done) {
    var results = null
    this.nightmare()
      .goto(url)
      .wait("article p") // wait for the content to load
      .evaluate(function () {
        function getInnerText(selector) {
          var sel = window.getSelection()
          sel.selectAllChildren(document.querySelector(selector))
          var content = "" + sel
          sel.removeAllRanges()
          return content
        }

        var title = document.querySelector("h1").innerHTML
        var html = document.querySelector("article").innerHTML
        var url = encodeURI(document.location)
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
      }, function(docs) {
        results = docs
      })
      .run(function(err, nightmare){
        if (err) {
          done(err)
          return
        }
        done(null, results)
      })
  }
}

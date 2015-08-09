import {BaseScraper} from './BaseScraper'

export default class Mingpao extends BaseScraper {
  list(done) {
    var results = null
    this.nightmare()
      .goto("http://news.mingpao.com/pns/%E6%96%B0%E8%81%9E%E7%B8%BD%E8%A6%BD/web_tc/archive/latest")
      .wait(() => (typeof jQuery !== 'undefined'), true)
      .evaluate(function () {
        var links = []
        $('.listing ul li a').each((idx, a) => {
          links.push({title: a.text.trim(), href: a.href})
        })
        return links
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
      .wait("article p")
      .evaluate(function () {
        var title = document.querySelector("h1").innerHTML
        var html = document.querySelector("article").innerHTML
        var url = encodeURI(document.location)

        // get text
        var sel = window.getSelection()
        sel.selectAllChildren(document.querySelector("article"))
        var content = "" + sel
        sel.removeAllRanges()

        var imageUrl = document.querySelector("meta[property=\"og:image\"]").getAttribute('content')
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

import {BaseScraper} from './BaseScraper'

export default class AppleDaily extends BaseScraper {
  list(done) {
    var results = null
    this.nightmare()
      .goto("http://hk.apple.nextmedia.com/")
      .evaluate(function () {
        // use Array.prototype.slice to convert NodeList into array
        // then convert the nodes into data
        // then filter the non-null links
        return Array.prototype.slice.call(document.querySelectorAll('#article_ddl option'))
          .map((a) => ({title: a.textContent.trim(), href: a.getAttribute("value")}))
          .filter((a, idx) => a.href && a.href.indexOf("http:") > -1)
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
      .evaluate(function () {
        var title = document.querySelector("#articleContent h1").textContent.trim()
        var html = document.querySelector("#masterContent").innerHTML
        var url = encodeURI(document.location)

        // get text
        var sel = window.getSelection()
        sel.selectAllChildren(document.querySelector("#masterContent"))
        var content = "" + sel
        sel.removeAllRanges()

        var imageUrl = document.querySelector("meta[property=\"og:image\"]").getAttribute('content')
        return {
          source: 'appledaily',
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

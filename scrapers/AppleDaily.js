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
          .map((a) => ({title: a.textContent.trim(), link: a.getAttribute("value")}))
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
      .evaluate(function () {
        function getInnerText(selector) {
          var sel = window.getSelection()
          sel.selectAllChildren(document.querySelector(selector))
          var content = "" + sel
          sel.removeAllRanges()
          return content
        }

        var title = document.querySelector("#articleContent h1").textContent.trim()
        var html = document.querySelector("#masterContent").innerHTML
        var url = encodeURI(document.location)
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

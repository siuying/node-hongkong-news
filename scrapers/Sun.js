import {BaseScraper} from './BaseScraper'

export default class Sun extends BaseScraper {
  list(done) {
    var results = null
    this.nightmare()
      .goto("http://the-sun.on.cc/")
      .evaluate(function () {
        // use Array.prototype.slice to convert NodeList into array
        // then convert the nodes into data
        // then filter the non-null links
        return Array.prototype.slice.call(document.querySelectorAll('#articleListSELECT option'))
          .filter((a) => a.getAttribute("value") && a.getAttribute("value").indexOf("/") > -1)
          .map((a) => ({title: a.textContent.trim(), link: ('http://the-sun.on.cc' + a.getAttribute("value"))}))
          .filter((a) => a.link && a.link.indexOf("/") > -1)
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

        var title = document.querySelector("#acticle_header h1").textContent.trim()
        var html = document.querySelector(".para_content").innerHTML
        var url = encodeURI(document.location)
        var content = getInnerText(".para_content")
        var image = document.querySelector(".para_content .content_photo_img img")
        var imageUrl = image ? ('http://the-sun.on.cc' + image.getAttribute('src')) : null
        return {
          source: 'sun',
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

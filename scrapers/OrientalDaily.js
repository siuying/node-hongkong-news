import {BaseScraper} from './BaseScraper'

export default class OrientalDaily extends BaseScraper {
  list() {
    return this.nightmare()
      .goto("http://orientaldaily.on.cc/")
      .wait("#articleListSELECT")
      .evaluate(() => {
        // use Array.prototype.slice to convert NodeList into array
        // then convert the nodes into data
        // then filter the non-null links
        return Array.prototype.slice.call(document.querySelectorAll('#articleListSELECT option'))
          .filter((a) => a.getAttribute("value") && a.getAttribute("value").indexOf("/") > -1)
          .map((a) => ({title: a.textContent.trim(), link: ('http://orientaldaily.on.cc' + a.getAttribute("value"))}))
          .filter((a) => a.link && a.link.indexOf("/") > -1)
      })
      .end()
  }

  news(url) {
    return this.nightmare()
      .goto(url)
      .wait("#contentCTN-right")
      .evaluate(function () {
        function getInnerText(selector) {
          var sel = window.getSelection()
          sel.selectAllChildren(document.querySelector(selector))
          var content = "" + sel
          sel.removeAllRanges()
          return content
        }

        var title = document.querySelector("h1").textContent.trim()
        var html = document.querySelector("#contentCTN-top").innerHTML + document.querySelector("#contentCTN-right").innerHTML
        var url = document.location.href
        var content = getInnerText("#contentCTN-top") + "\n" + getInnerText("#contentCTN-right")
        var image = document.querySelector("#contentCTN .photo img")
        var imageUrl = image ? ('http://orientaldaily.on.cc' + image.getAttribute('src')) : null
        return {
          source: 'orientaldaily',
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

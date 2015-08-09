import mocha from 'mocha'
import expect from 'expect.js'
import Sun from '../scrapers/Sun'

describe('Sun', () => {
  var scraper

  beforeEach(() => {
    scraper = new Sun()
  })

  describe('#list', () => {
    it('should list news', function(done){
      this.timeout(20000)
      scraper.list((error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })
  })

  describe('#news', () => {
    it('should find news', function(done){
      this.timeout(20000)
      var url = "http://the-sun.on.cc/cnt/news/20150809/00405_001.html"
      scraper.news(url, (error, document) => {
        expect(document).to.be.ok()
        expect(document.source).to.equal("sun")
        expect(document.title).to.equal("5幢公屋未落成已中招  安達邨拆「鉛」喉重鋪")
        expect(document.url).to.equal(url)
        expect(document.content).to.match(/很多單位的水喉已拆走/)
        expect(document.html).to.match(/很多單位的水喉已拆走/)
        expect(document.image_url).to.equal("http://the-sun.on.cc/cnt/news/20150809/photo/0809-00405-001p1g1.jpg")
        done()
      })
    })
  })
})

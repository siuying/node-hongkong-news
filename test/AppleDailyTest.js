import mocha from 'mocha'
import expect from 'expect.js'
import AppleDaily from '../scrapers/AppleDaily'

describe('AppleDaily', () => {
  var scraper

  beforeEach(() => {
    scraper = new AppleDaily()
  })

  describe('#list', () => {
    it('should list news', function(done){
      this.timeout(20000)
      scraper.list()
        .then((result) => {
          expect(result).to.be.ok()
          expect(result.length > 0).to.be.ok()
          done()
        })
        .catch((error) => {
          done(error)
        })
    })
  })

  describe('#news', () => {
    it('should find news', function(done){
      this.timeout(20000)
      var url = "http://hk.apple.nextmedia.com/financeestate/first/20150809/19248635"
      scraper.news(url)
        .then((document) => {
          expect(document).to.be.ok()
          expect(document.source).to.equal("appledaily")
          expect(document.title).to.equal("恒地、長實、新地近2,000伙本月發售臨近加息4新盤趕散貨")
          expect(document.url).to.equal(url)
          expect(document.content).to.match(/加息期近/)
          expect(document.html).to.match(/加息期近/)
          expect(document.image_url).to.equal("http://static.apple.nextmedia.com/images/apple-photos/video/20150809/392pix/1439065272_0c9e.jpg")
          done()
        })
        .catch((error) => {
          done(error)
        })
    })
  })
})

import mocha from 'mocha'
import expect from 'expect.js'
import OrientalDaily from '../scrapers/OrientalDaily'

describe('OrientalDaily', () => {
  var scraper

  beforeEach(() => {
    scraper = new OrientalDaily()
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
      var url = "http://orientaldaily.on.cc/cnt/news/20150809/00174_001.html"
      scraper.news(url)
        .then((document) => {
          expect(document).to.be.ok()
          expect(document.source).to.equal("orientaldaily")
          expect(document.title).to.equal("36.3℃ 130年來最熱")
          expect(document.url).to.equal(url)
          expect(document.content).to.match(/昨日本是廿四節氣的立秋/)
          expect(document.html).to.match(/昨日本是廿四節氣的立秋/)
          expect(document.image_url).to.equal("http://orientaldaily.on.cc/cnt/news/20150809/photo/0809-00174-001h1.jpg")
          done()
        })
        .catch((error) => {
          done(error)
        })
    })
  })
})

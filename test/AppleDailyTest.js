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
      var url = "https://hk.news.appledaily.com/local/daily/article/20180701/20436759"
      scraper.news(url)
        .then((document) => {
          expect(document).to.be.ok()
          expect(document.source).to.equal("appledaily")
          expect(document.title).to.equal("阻街被釘牌「B仔涼粉」照營業")
          expect(document.url).to.equal(url)
          expect(document.content).to.match(/食物業規例/)
          expect(document.html).to.match(/每天另加罰款900元/)
          expect(document.image_url).to.equal("https://static.appledaily.hk/images/apple-photos/video/20180701/720pix/1530389051_1382.jpg")
          done()
        })
        .catch((error) => {
          done(error)
        })
    })
  })
})

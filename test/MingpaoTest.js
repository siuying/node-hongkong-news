import mocha from 'mocha'
import expect from 'expect.js'
import Mingpao from '../scrapers/Mingpao'

describe('Mingpao', () => {
  var scraper

  beforeEach(() => {
    scraper = new Mingpao()
  })

  describe('#list', () => {
    it('should list news', function(done){
      this.timeout(10000)
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
      var url = "https://news.mingpao.com/pns/dailynews/web_tc/article/20180701/s00001/1530383020404"
      scraper.news(url)
        .then((document) => {
          expect(document).to.be.ok()
          expect(document.source).to.equal("mingpao")
          expect(document.title).to.match(/4個大紫荊 3人撐林鄭選戰名單4年無泛民/)
          expect(document.url).to.equal(url)
          expect(document.content).to.match(/特首林鄭月娥公布上任後首份授勳名單/)
          expect(document.html).to.match(/特首林鄭月娥公布上任後首份授勳名單/)
          expect(document.image_url).to.equal("https://fs.mingpao.com/pns/20180701/s00006/33490120fe8624fd3c33b38ee8758a3c.jpg")
          done()
        })
        .catch((error) => {
          done(error)
        })
    })
  })
})

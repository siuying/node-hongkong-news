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
      var url = "http://news.mingpao.com/pns/%E9%AB%98%E9%90%B5%E7%B1%B3%E5%9F%94%E9%91%BD%E5%9C%B0%20%20%E6%B3%A5%E6%BC%BF%E6%B9%A7%E9%AD%9A%E5%A1%98%20%E5%8A%A0%E5%A3%93%E8%87%B4%E8%A3%82%E7%B8%AB%E5%99%B4%E6%BC%BF%20%E6%B8%AF%E9%90%B5%E5%8D%B3%E6%99%82%E5%A1%AB%E8%A3%9C/web_tc/article/20150808/s00001/1438970384020"
      scraper.news(url, (error, document) => {
        expect(document).to.be.ok()
        expect(document.source).to.equal("mingpao")
        expect(document.title).to.match(/高鐵米埔鑽地/)
        expect(document.url).to.equal(url)
        expect(document.content).to.match(/香港觀鳥會保育主任胡明川表示/)
        expect(document.html).to.match(/香港觀鳥會保育主任胡明川表示/)
        expect(document.image_url).to.equal("http://fs.mingpao.com/pns/20150808/s00006/5dc1fc6adb8b6fbfe06074bddc696c34.jpg")
        done()
      })
    })
  })
})

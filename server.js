var express = require('express')
var bodyParser = require('body-parser')

var scrapers = require('./scrapers')
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// return list of news
app.get('/lists/:name', function(req, res, next) {
  var scraperName = req.params.name
  var scraperClass = scrapers[scraperName]
  var scraper = new scraperClass()
  if (!scraper) {
    next()
    return
  }

  scraper.list(function(error, results){
    res.send(results)
  })
})

// param: url - the url to fetch
// return a specific news
app.post('/news/:name', function(req, res, next) {
  var scraperName = req.params.name
  var scraperClass = scrapers[scraperName]
  var scraper = new scraperClass()
  if (!scraper) {
    next()
    return
  }

  var url = (req.body && req.body.url) ? req.body.url : null
  if (!url) {
    next()
    return
  }

  console.log("request url", url)
  scraper.news(url, function(error, results){
    res.send(results)
  })
})

app.listen(5000, function(){
  console.log('Express server listening on port 5000')
})

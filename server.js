var express = require('express')
var bodyParser = require('body-parser')

var scrapers = require('./scrapers')
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// return list of news
app.get('/lists/:name', function(req, res, next) {
  var scraperName = req.params.name
  var scraper = scrapers[scraperName]
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
app.get('/news/:name', function(req, res, next) {
  var scraperName = req.params.name
  var scraper = scrapers[scraperName]
  if (!scraper) {
    next()
    return
  }

  var url = encodeURI(req.query.url)
  if (!url) {
    next()
    return
  }
  scraper.news(url, function(error, results){
    res.send(results)
  })
})

app.listen(5000, function(){
  console.log('Express server listening on port 5000')
})

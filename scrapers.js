var Mingpao = require('./dist/Mingpao')
var AppleDaily = require('./dist/AppleDaily')
var OrientalDaily = require('./dist/OrientalDaily')
var Sun = require('./dist/Sun')

module.exports = {
  appledaily: new AppleDaily(),
  mingpao: new Mingpao(),
  orientaldaily: new OrientalDaily(),
  sun: new Sun()
}

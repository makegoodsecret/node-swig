var mongoose = require('mongoose')
var User = require('../resources/User');
var Track = require('../resources/Track');
var Score = require('../resources/Score');
var Tournament = require('../resources/Tournament');

mongoose.connection.on('error', function (err) {
	console.log('MONGOOSE CONNECTION ERROR <---')
	console.log(err)
})

mongoose.connection.on('connecting', function (data) {
	console.log('MONGOOSE CONNECTING <---')
	console.log(data)
})

mongoose.connection.on('connected', function (data) {
	console.log('MONGOOSE CONNECTED <---')
	console.log(data)
})

mongoose.connect('localhost', 'audiobrush')
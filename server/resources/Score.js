var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Score = Schema({

	//change these to track
	trackId: [
		{ type: Schema.Types.ObjectId, ref: 'Track' }
	],
	userId : [ //and user
		{ type: Schema.Types.ObjectId, ref: 'User' }
	],
	score  : {
		type   : Number,
		default: 0
	},
	created: {
		type   : Date,
		default: Date.now()
	}
});

mongoose.model('Score', Score);
module.exports = mongoose.model('Score');
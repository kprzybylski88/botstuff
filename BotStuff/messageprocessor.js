const Hunt = require('./game.js');



module.exports = Processor;
function Processor() {
	this.hunts = {};
	var parentObj = this;
	this.commands = {
		'ping' :
			function(authorId) {
				return ['pong'];
			},
		
		'starthunt' :
			function(authorId) {
				console.log(typeof parentObj.hunts.authorId);
				if (typeof parentObj.hunts[authorId] == 'undefined') {
					parentObj.hunts[authorId] = new Hunt();
					parentObj.hunts[authorId].state = 'clue0';
					return ['hunt begins! Check your DMs!',parentObj.hunts[authorId].clue[parentObj.hunts[authorId].state]];
				} else {
					return ['You are already hunting!'];
				}
				
			}
		
	};
	this.respond = function(message, authorId) {
		try {
			return this.commands[message](authorId);
		} catch (error) {
			console.log('No such command: ' +message + error.message);
			return false;
		}
	}
}
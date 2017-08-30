console.log("atla3");

var Twit = require('twit');

var config = require('./config');


var T = new Twit(config);

var tweet = {
	status: '#Magic_Coding' 
}

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
  	if(err) console.log('oops something went wrong baby');
  	else  console.log('working');
}
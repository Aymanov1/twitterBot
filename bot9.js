console.log('The unfollower chmayti bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);
var stream = T.stream('user');

followBack('Jallabi_Aymen');
//followTarget('safubiofficial');
//followTarget('F_ALI');

// Anytime someone follows me
function followTarget(username){
  var smallarray=[];
  var quotaPerDay=[];
   T.get('followers/list', { screen_name: username },  function (err, data, response) {
     for (item in data) {
     	for (subItem in data[item]) {
     	//follow that target follower 
      if(typeof data[item][subItem].screen_name !== "undefined")
   		smallarray.push(data[item][subItem].screen_name);
    //  getFollowersBack(data[item][subItem].screen_name);
         
     	}
     }   
    getFollowersBack(username);



while (smallarray.length > 0) {
  quotaPerDay = smallarray.splice(0,3)
//for(item in quotaPerDay) 
 

  // getFollowersBack(quotaPerDay[item]);

    //  setInterval(followAccount(quotaPerDay[item]),1000*60*60*24);
}
   
    });

}

function followBack(username){
  var smallarray=[];
  var quotaPerDay=[];
   T.get('followers/list', { screen_name: username },  function (err, data, response) {
     for (item in data) {
      for (subItem in data[item]) {
      //follow that target follower 
      if(typeof data[item][subItem].screen_name !== "undefined")
      smallarray.push(data[item][subItem].screen_name);
    
      }
     }   
   getFollowersBack(username);
while (smallarray.length > 0) {
  quotaPerDay = smallarray.splice(0,3);
for(item in quotaPerDay)
getFollowersBack(quotaPerDay[item]); 
     //  setInterval(followAccount(quotaPerDay[item]),1000*60*60*24);
}
   
    });

}



function getFollowersBack(username){
var smallarray=[];
  T.get('friendships/show', {  target_screen_name: username },  function (err, data, response) {
    
     for (item in data) {
      for (subItem in data[item]) {
        
      //follow that target follower 
      if(typeof data[item][subItem].screen_name !== "undefined" && data[item][subItem].following == false && data[item][subItem].screen_name != "KingAymanov")
        {console.log('hedha bch enna7ih '+data[item][subItem].screen_name);

         /* T.post('friendships/destroy', { id: data[item][subItem].id }, function(err, reply) {
                if(err) return console.log(err);
                console.log("name "+ data[item][subItem].name);
                var name = data[item][subItem].screen_name
                console.log("\nPrune: unfollowed @"+ name);
              });  */
        }
      }
     } 
    
 
    
        
  });
  
}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}


function followAccount(idAccount){
  T.post('friendships/create', { id: idAccount }, function(err, data, response) {
          if(err) console.log('not working');
          else   console.log('it works ');
      });
}


function unfollowTarget(username){
    T.get('followers/ids', { screen_name: username },  function (err, reply,response) {
    
      if(err) return callback(err);
      
      var followers = reply.ids;
      
      T.get('friends/ids', function(err, reply) {
          if(err) return callback(err);          
          var friends = reply.ids
            , pruned = false;
          var item;
          while(!pruned) {
            //var target = randIndex(friends);
            for (item in friends) {
              if(!~followers.indexOf(item)) {
                pruned = true;
                T.post('friendships/destroy', { id: friends[item] }, function(err, reply) {
                if(err) return console.log(err);
   
                var name = reply.screen_name
                console.log("\nPrune: unfollowed @"+ name);
              });         
              }
            }
         }
      });
  });
   // tweetIt('it looks better now!!');
 }
  

 function unfollowAll(){
  	T.get('followers/ids', function(err, reply) {
      if(err) return callback(err);
      
      var followers = reply.ids;
      
      T.get('friends/ids', function(err, reply) {
          if(err) return callback(err);          
          var friends = reply.ids
            , pruned = false;
          
          while(!pruned) {
            //var target = randIndex(friends);
            for (item in friends) {
	            if(!~followers.indexOf(item)) {
	              pruned = true;
	              T.post('friendships/destroy', { id: friends[item] }, function(err, reply) {
	      				if(err) return console.log(err);
	 
	      				var name = reply.screen_name
	      				console.log("\nPrune: unfollowed @"+ name);
	    				});         
	            }
            }
         }
      });
  });
  //	tweetIt('it looks better now!!');
 }
  

function tweetIt(txt) {

	var tweet = {
	  status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
	  if (err) {
	  	console.log("Something went wwrong!");
	  } else {
	    console.log("It worked!");
	  }
	}
}

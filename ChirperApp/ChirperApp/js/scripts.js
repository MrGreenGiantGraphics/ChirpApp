/* Application - Chirper
 
Come up with the schema for the twitter application. - DONE!

* URL structure for all directories - DONE!
* All objects you will be storing in firebase.
* All properties of those objects.
* Pay attention to casing and the data type 
  - (especially on dates) of properties.

Requirements: 
* CRUD on tweets
* CRUD for friends
* CRUD for Profile

Read Friends tweets
* On initial page, load your tweets and sort them by timestamp
* A timeline page, which shows all tweets from all friends sorted by timestamp 
  (should use polling)

* Goal be able to Search Tweets 

*********************************************************************************************/

// The array of Friends
var friends = [];

// The array of chirps
var tweets = [];

// The Array of Profiles
var profile = [];

// Urls for database connection.
var chirpTypeFriendUrl = "https://greengiantgraphics.firebaseio.com/friends/.json";
var chirpTypeTweetsUrl = "https://greengiantgraphics.firebaseio.com/tweets/.json";
var chirpTypeProfileUrl = "https://greengiantgraphics.firebaseio.com/profile/.json";
var xhr = new XMLHttpRequest();

// First Create the Constructor for the Object of Friend.
function Friend(name, handler, city, url) {
    this.name = name;
    this.handler = handler;
    this.city = city;
    this.url = url;
    this.chirp = [];
};

// Next Create the Constructor for the Object of Tweet
function Tweet(chirps, username) {
    this.chirps = chirps;
    this.date = moment();
    this.username = username;
};

// Now Create the Constructor for the Object of Profile
function Profile(name, handle, clty, url) {
    this.name = name;
    this.handle = handle;
    this.city = city;
    this.url = url;
}

// Create the URL maker,
//URL Maker
var urlMaker = function (base) {
    var url = "https://" + base + ".firebaseio.com/"
    for (var i = 1; i < arguments.length; i++) {
        url += arguments[i] + "/"
    }
    return url + ".json";
}

/*First thing to do is get data from the Firebase server. Create a GET function with XHR*/
var retrieveProfile = function () {
    var request = xhr;
    request.open('GET', chirpTypeProfileUrl, true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was successful');
            var name = data.name;
            var handle = data.handle;
            var city = data.city;
            var url = data.url;
            profile = new Profile(name, handle, city, url)
            // Line 30 in HTML connect the profile-name, profile-handle, profile-city
            var Name = '<a href="#" id="profile-name"><i class="glyphicon glyphicon-comment"></i>&nbsp;&nbsp;' + profile.name + '</a>';
            var Handle = '<a href="#" id="profile-handle"><i class="glyphicon glyphicon-user"></i>&nbsp;&nbsp;' + profile.handle + '</a>';
            var City = '<a href="#" id="profile-city"><i class="glyphicon glyphicon-home"></i>&nbsp;&nbsp;' + profile.city + '</a>';

            $('#profile-handle').empty();
            $('#profile-name').empty();
            $('#profile-city').empty();
            $('#profile-handle').append(Handle);
            $('#profile-name').append(Name);
            $('#profile-city').append(City);
        } else {
            console.log("Error" + request.response);
        }
    }
}
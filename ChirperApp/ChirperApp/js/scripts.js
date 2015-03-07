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
var profiles = [];

// Urls for database connection.
var chirpTypeFriendUrl = "https://greengiantgraphics.firebaseio.com/friends/.json";
var chirpTypeFriendCus = "https://greengiantgraphics.firebaseio.com/friends/";
var chirpTypeTweetsUrl = "https://greengiantgraphics.firebaseio.com/tweets/.json";
var chirpTypeTweetsCus = "https://greengiantgraphics.firebaseio.com/tweets/";
var chirpTypeProfileUrl = "https://greengiantgraphics.firebaseio.com/profile/.json";
var chirpTypeProfileCus = "https://greengiantgraphics.firebaseio.com/profile/";
var xhr = new XMLHttpRequest();

var xhr = new XMLHttpRequest();

// First Create the Constructor for the Object of Friend.
function Friend(name, city, handle, url) {
    this.name = name;
    this.city = city;
    this.handle = handle;
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
function Profile(name, handle, city, url) {
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
   // request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var dataString = JSON.parse(request.response);
            console.log('GET was successful');
            // Create an Object to collect profile array
            var profile = {};
            // Created a for loop to store arrays
            for (var i in dataString) {
                profile.name = dataString[i].name;
                profile.handle = dataString[i].handle;
                profile.city = dataString[i].city;
                profile.url = dataString[i].url;
            }
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
            console.log(profile);
        } else {
            console.log("Error" + request.response);
        }
    }

    request.send();
}

// EDIT - user clicked edit
function editProfile() {

    var currInfo = profile;

    $("#handle-input").val(profile.handle);
    $("#user-input").val(profile.name);
    $("#city-input").val(profile.city);

    console.log(currInfo);//test
}

$("#update-profile").click(function () { //update button
    xhrUpdate();
});

function xhrUpdate() {

    var nickname = $("#handle-input").val();
    var user = $("#user-input").val();
    var city = $("#city-input").val();
    var updatedProfile = new Profile(name, handle, city, null);
    var myrequest = xhr;
    myrequest.open("PUT", chirpTypeProfileCustom, true);
    console.log(updatedProfile);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) { // success
            console.log("PUT was a success", this.response);
            retrieveProfile();
        } else { // problem
            console.log("Houston we have a problem!");
        }
    };
    var jsonToSend = JSON.stringify(updatedProfile); // covert to string
    myrequest.send(jsonToSend); // send to firebase
}




var retrieveFriends = function () {
    var request = xhr;
    request.open('GET',chirpTypeFriendUrl, true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var dataFriends = JSON.parse(request.response);
            console.log('GET was successful');
            friends = [];
            for (var i in dataFriends) {
                dataFriends[i].id = i;
                friends.push(dataFriends[i]);
            }
            displayfriends();
        } else {
            console.log("Error" + request.response);
        }
    }
}

function displayProfile(profile) {
    $('#profile-handle').innerHTML = "#nbsp;" + profile.handle;
    $('#profile-name').innerHTML = "#nbsp;" + profile.name;
    $('#profile-city').innerHtml = "<a href='#'><i class='glyphicon glyphicon-home'></i>#nbsp;'" + profile.city + "</a>";

}
retrieveProfile();

//Render Content to Screen(Friends)//
displayfriends = function () {

    $("#friend-render").empty();

    for (var i in friends) {

        var dataObj = friends[i];
        var newFriend = new Friend(dataObj.name, dataObj.city, dataObj.handle, dataObj.url);

        newFriend.__proto__ = { id: i };
        people.push(newFriend);

        $("#view-friends").append("<h4 class='text-center'><strong>" + dataObj.handle + "</strong></h4>");
        $("#view-friends").append("<p class='text-center'>" + dataObj.name + "</p>");;
        $("#view-friends").append("<p class='text-center'>" + dataObj.city + "</p>");
        $("#view-friends").append("<a href='#'><i class='glyphicon glyphicon-trash' onclick='deleteFriend(" + i + ")'></i></a><hr>")
    }
};
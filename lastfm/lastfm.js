// GLOBAL VARIABLES
var api_key = "a0f6605fafd4fe8da5875bc7c04dca05";
var currentUser = "zachbwh"; // the default main user
var currentModel;
numberOfRecentTracks = 15;
// END OF GLOBAL VARIABLES

// INITIALISATION CODE
updateModel();
// END OF INITIALISATION CODE

// HELPER FUNCTIONS
function createAlbumArtThumbnail (jsonTrackObj) {
  var albumArtLink = jsonTrackObj.image[0]["#text"];
  var albumName = jsonTrackObj.album["#text"];
}
function createArtistlink (jsonTrackObj) {
  var trackLink = jsonTrackObj.url;
  var cutPoint = trackLink.lastIndexOf("_/");
  var artistLink = trackLink.substring(0, cutPoint);
  var artistName = jsonTrackObj.artist["#text"];
  return "<a href='" + artistLink + "'>" + artistName + "</a>";
}
function createTrackLink (jsonTrackObj) {
  var trackLink = jsonTrackObj.url;
  var trackName = jsonTrackObj.name;
  return "<a href='" + trackLink + "'>" + trackName + "</a>";
}
function createUserLink (jsonUserInfoObj) {
  var userLink = jsonUserInfoObj.user.url;
  var username = jsonUserInfoObj.user.name;
  return "<a href='" + userLink + "'>" + username.toUpperCase() + "</a";
}

function timeSince (date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

function timeSincePlayed (jsonTrackObj) {
  var datetime = parseInt(jsonTrackObj.date.uts);
  return timeSince(datetime);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
// END OF HELPER FUNCTIONS

// UPDATE MODEL FUNCTIONS
function updateUsers (usernameList) {
  if (usernameList[0] != null) {

    var userInfoAndTracks = {}; // this object gets pushed to the model

    // retrieves user information from last.fm
    var userInfoRequest = new XMLHttpRequest();
    userInfoRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var userInfo = JSON.parse(this.responseText);
        userInfoAndTracks.userInfo = userInfo;
        console.log("userRecentTracksRequest returned")

        var userRecentTracksRequest = new XMLHttpRequest();
        userRecentTracksRequest.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var userRecentTracks = JSON.parse(this.responseText);
            userInfoAndTracks.userRecentTracks = userRecentTracks;
            console.log("userInfoRequest returned")
            newModel.push(userInfoAndTracks);
            if (usernameList.length < 0) {
              updateUsers(usernameList.slice(1, usernameList.length));
            }
          }
        };
        userRecentTracksRequest.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + usernameList[0] + "&api_key=" + api_key + "&format=json&limit=" + numberOfRecentTracks, true);
        userRecentTracksRequest.send();

      }
    };
    userInfoRequest.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" + usernameList[0] + "&api_key=" + api_key + "&format=json", true);
    userInfoRequest.send();
  } else {
    currentModel = newModel;
    updateView();
  }
}

function updateModel () {
  var newModel = [];
  var currentUserRecentTracks;
  var currentUserInfo;



  var userFriends; // one javascript object which contains all of the users the currentUser is following with basic info about them
  var numberOfFriends;
  var usernameList = [currentUser]; // an array simply contianing the usernames of all the users the currentUser is following and starting with the currentUser
  var userFriendsRequest = new XMLHttpRequest();
  userFriendsRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      userFriends = JSON.parse(this.responseText);
      numberOfFriends = userFriends.friends["@attr"].total;
      for (i = 0; i < numberOfFriends; i++) {
        console.log(userFriends.friends.user[i].name);
        usernameList.push(userFriends.friends.user[i].name);
      }
      updateUsers(usernameList);
    }
  };
  userFriendsRequest.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getfriends&user=" + currentUser + "&api_key=" + api_key + "&format=json", true);
  userFriendsRequest.send();

  //PUTTING IN RECURSIVE FUNCTION
  /*
  for (i = 0; i < usernameList.length; i++) {
    console.log(usernameList[i]);
    var userInfoAndTracks = {}; // this object gets pushed to the model

    // retrieves user information from last.fm
    var userInfoRequest = new XMLHttpRequest();
    userInfoRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var userInfo = JSON.parse(this.responseText);
        userInfoAndTracks.userInfo = userInfo;
        console.log("userRecentTracksRequest returned")
      }
    };
    userInfoRequest.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" + usernameList[i] + "&api_key=" + api_key + "&format=json", true);
    userInfoRequest.send();

    // retrieves user recent tracks from last.fm
    var userRecentTracksRequest = new XMLHttpRequest();
    userRecentTracksRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var userRecentTracks = JSON.parse(this.responseText);
        userInfoAndTracks.userRecentTracks = userRecentTracks;
        console.log("userInfoRequest returned")
      }
    };
    userRecentTracksRequest.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + usernameList[i] + "&api_key=" + api_key + "&format=json&limit=" + numberOfRecentTracks, true);
    userRecentTracksRequest.send();

    newModel.push(userInfoAndTracks);
  }

  currentModel = newModel;
  */
  // END OF PUTTING IN RECURSIVE FUNCTION
}

function updateCurrentUser (event, newUsername) {
  if (event.which == 13) {
    console.log("enter key pressed");
    currentUser = newUsername;
    updateModel();
    console.log("test " + currentModel[0].userInfo)
    //updateView();
  }
}

function updateView() {
  // Update current user first
  document.getElementById("currentUserDP").src = currentModel[0].userInfo.user.image[2]["#text"]; // update main user profile photo
  document.getElementById("currentUserName").innerHTML = currentModel[0].userInfo.user.name.toUpperCase(); // update main user username
  document.getElementById("CUTS").innerHTML = currentModel[0].userInfo.user.playcount.toString(); // update scrobble count

}

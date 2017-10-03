// GLOBAL VARIABLES
var api_key = "a0f6605fafd4fe8da5875bc7c04dca05";
var currentUser = "zachbwh"; // the default main user
var currentUserInfo;
var currentUserRecentTracks;
var currentModel;
numberOfRecentTracks = 15;
// END OF GLOBAL VARIABLES

// INITIALISATION CODE
updateModel();
// END OF INITIALISATION CODE

// HELPER FUNCTIONS
function createAlbumArtThumbnail (jsonTrackObj) {
  var albumArtLink = jsonTrackObj.image[0]["#text"];
  var albumArtObject = document.createElement('img');
  albumArtObject.src = albumArtLink;
  return albumArtObject;
}
function createAlbumText (jsonTrackObj) {
  var albumNameObject = document.createTextNode(jsonTrackObj.album["#text"]);
  return albumNameObject;
}
function createArtistLink (jsonTrackObj) {
  var trackLink = jsonTrackObj.url;
  var cutPoint = trackLink.lastIndexOf("_/");
  var artistLink = trackLink.substring(0, cutPoint);
  var artistName = jsonTrackObj.artist["#text"];
  var artistLinkObject = document.createElement('a');
  artistLinkObject.href = artistLink;
  artistLinkObject.appendChild(document.createTextNode(artistName));
  return artistLinkObject;
}
function createTrackLink (jsonTrackObj) {
  var trackLink = jsonTrackObj.url;
  var trackName = jsonTrackObj.name;
  var trackLinkObject = document.createElement('a');
  trackLinkObject.href = trackLink;
  trackLinkObject.appendChild(document.createTextNode(trackName));
  return trackLinkObject;
}
function createUserLink (jsonUserInfoObj) {
  var userLink = jsonUserInfoObj.user.url;
  var username = jsonUserInfoObj.user.name;
  return "<a href='" + userLink + "'>" + username.toUpperCase() + "</a>";
}

function timeSince (date) {
  var seconds = Math.floor(((new Date().getTime() / 1000) - date));
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
    return interval + " d";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " h";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " m";
  }
  return Math.floor(seconds) + " seconds";
}

function timeSincePlayed (jsonTrackObj) {
  if (jsonTrackObj["@attr"] != null) {
    var output = document.createTextNode("Playing Now");
    output['data-unixtime'] = jsonTrackObj.date.uts;
    return output
  } else {
    var datetime = parseInt(jsonTrackObj.date.uts);
    var output = document.createTextNode(timeSince(datetime))
    output['data-unixtime'] = jsonTrackObj.date.uts;
    return output;
  }
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
function updateUsers (usernameList, newModel) {
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
            if (usernameList.length > 0) {
              updateUsers(usernameList.slice(1, usernameList.length), newModel);
            }
          }
        };
        userRecentTracksRequest.open("GET", "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + usernameList[0] + "&api_key=" + api_key + "&format=json&limit=" + numberOfRecentTracks, true);
        userRecentTracksRequest.send();

      }
    };
    userInfoRequest.open("GET", "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" + usernameList[0] + "&api_key=" + api_key + "&format=json", true);
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
      updateUsers(usernameList, newModel);
    }
  };
  userFriendsRequest.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getfriends&user=" + currentUser + "&api_key=" + api_key + "&format=json", true);
  userFriendsRequest.send();
}

function updateCurrentUser (event, newUsername) {
  if (event.which == 13) {
    currentUser = newUsername;
    updateModel();
  }
}

//UPDATE VIEW FUNCTIONS

function updateCurrentUserRecentTracksView (userRecentTracks) {
  var table = document.createElement('tbody');
  //var table = document.getElementById("currentUserRecentTracks").tBodies[0];
  for (var i=0; i<numberOfRecentTracks; i++) {
    //var jsonTrackObj = currentModel[0].userRecentTracks.recenttracks.track[i];
    var jsonTrackObj = userRecentTracks.recenttracks.track[i];

    var newRow = document.createElement('tr');
    var albumCell = document.createElement('td');
    var trackNameCell = document.createElement('td');
    var artistNameCell = document.createElement('td');
    var timePlayedCell = document.createElement('td');

    albumCell.appendChild(createAlbumArtThumbnail(jsonTrackObj));
    albumCell.appendChild(createAlbumText(jsonTrackObj));
    artistNameCell.appendChild(createArtistLink(jsonTrackObj));
    trackNameCell.appendChild(createTrackLink(jsonTrackObj));
    timePlayedCell.appendChild(timeSincePlayed(jsonTrackObj));

    newRow.appendChild(albumCell);
    newRow.appendChild(artistNameCell);
    newRow.appendChild(trackNameCell);
    newRow.appendChild(timePlayedCell);

    table.appendChild(newRow);

    console.log("hmm");
    var zachbwhProfileImage = document.createElement('img');
    zachbwhProfileImage.src = "https://lastfm-img2.akamaized.net/i/u/300x300/6bf45f94307350945c1a64bd99c94234.png";
    addRecentTrackToCreeperBar(jsonTrackObj, "zachbwh", zachbwhProfileImage);
  }
  document.getElementById("currentUserRecentTracks").appendChild(table);
}

function addRecentTrackToCreeperBar(jsonTrackObj, username, userProfileImageObj) {
  var recentTrackDiv = document.createElement('div');
  recentTrackDiv.className = "mostRecentTrack";
  recentTrackDiv.id = username;

  userProfileImageObj.className = "creeperBarProfileImage";
  recentTrackDiv.appendChild(userProfileImageObj);

  var recentTrackTable = document.createElement('table');
  recentTrackTable.className = "mostRecentTrack";

  // Row 1 - Username and timeSincePlayed
  var row1 = document.createElement('tr');
  var row1col1 = document.createElement('td');
  row1col1.className = "recentTrackUsername";
  var recentTrackUsername = document.createTextNode(username);
  row1col1.appendChild(recentTrackUsername);
  row1.appendChild(row1col1);

  var row1col1Time = document.createElement('span');
  row1col1Time.className = "recentTrackTime";
  row1col1Time.appendChild(document.createTextNode("— "));
  row1col1Time.appendChild(timeSincePlayed(jsonTrackObj));
  row1.appendChild(row1col1Time);

  // Row 2 - Track Name
  var row2 = document.createElement('tr');
  var row2col1 = document.createElement('td');
  row2col1.className = "recentTrackRow";
  row2col1.appendChild(createTrackLink(jsonTrackObj));
  row2.appendChild(row2col1);

  // Row 3 - Artist Name
  var row3 = document.createElement('tr');
  var row3col1 = document.createElement('td');
  row3col1.className = "recentTrackRow";
  row3col1.appendChild(createArtistLink(jsonTrackObj));
  row3.appendChild(row3col1);

  // Row 4 - Album Name
  var row4 = document.createElement('tr');
  var row4col1 = document.createElement('td');
  row4col1.className = "recentTrackRow"
  row4col1.appendChild(createAlbumText(jsonTrackObj));
  row4.appendChild(row4col1);

  recentTrackTable.appendChild(row1);
  recentTrackTable.appendChild(row2);
  recentTrackTable.appendChild(row3);
  recentTrackTable.appendChild(row4);

  recentTrackDiv.appendChild(recentTrackTable);
  document.getElementById("creeperBar").appendChild(recentTrackDiv)
}

function updateView() {
  // Update current user first
  document.getElementById("currentUserDP").src = currentModel[0].userInfo.user.image[2]["#text"]; // update main user profile photo
  document.getElementById("currentUserName").innerHTML = currentModel[0].userInfo.user.name.toUpperCase(); // update main user username
  document.getElementById("CUTS").innerHTML = currentModel[0].userInfo.user.playcount.toString(); // update scrobble count
  updateCurrentUserRecentTracksView(currentModel[0].userRecentTracks);

}

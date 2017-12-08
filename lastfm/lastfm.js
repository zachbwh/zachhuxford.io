// GLOBAL VARIABLES
var api_key = "a0f6605fafd4fe8da5875bc7c04dca05";
var currentUser = "zachbwh"; // the default main user
var currentUserInfo;
var currentUserRecentTracks;
var currentModel;
var newModel;
numberOfRecentTracks = 1;
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
function createAlbumLink (jsonTrackObj) {
  var albumLinkObject = createArtistLink(jsonTrackObj);
  albumLinkObject.href += jsonTrackObj.album["#text"];
  albumLinkObject.innerHTML = jsonTrackObj.album["#text"];
  return albumLinkObject;
}
function createArtistLink (jsonTrackObj) {
  var trackLink = jsonTrackObj.url;
  var cutPoint = trackLink.lastIndexOf("_/");
  var artistLink = trackLink.substring(0, cutPoint);
  var artistName = jsonTrackObj.artist["#text"];
  var artistLinkObject = document.createElement('a');
  artistLinkObject.href = artistLink;
  artistLinkObject.target = "_blank";
  artistLinkObject.appendChild(document.createTextNode(artistName));
  return artistLinkObject;
}
function createTrackLink (jsonTrackObj) {
  var trackLink = jsonTrackObj.url;
  var trackName = jsonTrackObj.name;
  var trackLinkObject = document.createElement('a');
  trackLinkObject.href = trackLink;
  trackLinkObject.target = "_blank";
  trackLinkObject.appendChild(document.createTextNode(trackName));
  return trackLinkObject;
}
function createUserLink (username) {
  var userLinkObj = document.createElement('a');
  userLinkObj.href = "https://www.last.fm/user/" + username;
  userLinkObj.target = "_blank";
  userLinkObj.appendChild(document.createTextNode(username));

  return userLinkObj;
}

function timeSince (date) {
  var seconds = Math.floor(((new Date().getTime() / 1000) - date));
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(seconds / 31536000) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(seconds / 2592000) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(seconds / 86400) + " d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(seconds / 3600) + " h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(seconds / 60) + " m";
  }
  return Math.floor(seconds) + " seconds";
}

function timeSincePlayed (jsonTrackObj) {
  if (jsonTrackObj["@attr"] != null) {
    var output = document.createElement('i');
    output.className = "fa fa-volume-up time-since-played";
    //output['data-unixtime'] = jsonTrackObj.date.uts;
    return output
  } else {
    var datetime = parseInt(jsonTrackObj.date.uts);
    var output = document.createElement('span');
    output.appendChild(document.createTextNode(timeSince(datetime)));
    output.className = "time-since-played";
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
var updateUser = function(username, cb) {
  var userInfoAndTracks = {};
  var tasks1 = [];

  var getUserInfo = function(username, cb1){
    var userInfoRequest = new XMLHttpRequest();
    userInfoRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var userInfo = JSON.parse(this.responseText);
        userInfoAndTracks.userInfo = userInfo;
        console.log("userInfoRequest returned")
        cb1();
      }
    }
    userInfoRequest.open("GET", "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" + username + "&api_key=" + api_key + "&format=json", true);
    userInfoRequest.send();
  }
  tasks1.push(getUserInfo.bind(null, username));

  var getUserRecentTracks = function(username, cb1){
    var userRecentTracksRequest = new XMLHttpRequest();
    userRecentTracksRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var userInfo = JSON.parse(this.responseText);
        userInfoAndTracks.userRecentTracks = userInfo;
        console.log("userRecentTracksRequest returned")
        cb1();
      }
    }
    userRecentTracksRequest.open("GET", "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=" + api_key + "&format=json&limit=" + numberOfRecentTracks, true);
    userRecentTracksRequest.send();
  }
  tasks1.push(getUserRecentTracks.bind(null, username));

  async.parallel(tasks1, function(){
    newModel.push(userInfoAndTracks);
    cb();
  });

}

function updateUsers (usernameList, newModel) {
  var tasks = [];
  _.each(usernameList, function(element, index, list){
    //console.log("element = " + element);
    tasks.push(updateUser.bind(null, element));
  });
  //console.log(tasks);
  async.parallel(tasks, function(err, results){
    currentModel = newModel;

    // sort model by most recently played
    currentModel = _.sortBy(currentModel, function(user) {
      if (user.userRecentTracks.recenttracks.track[0].date != null) {
        return user.userRecentTracks.recenttracks.track[0].date.uts;
      } else {
        return Math.round((new Date()).getTime() / 1000);
      }
    })
    // invert order of model to get most recent first
    currentModel = currentModel.reverse();
    updateView();
  });
  /*
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
    */


}

function updateModel () {
  newModel = [];
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
        //console.log(userFriends.friends.user[i].name);
        usernameList.push(userFriends.friends.user[i].name);
      }
      updateUsers(usernameList, newModel);
    }
  };
  userFriendsRequest.open("GET", "https://ws.audioscrobbler.com/2.0/?method=user.getfriends&user=" + currentUser + "&api_key=" + api_key + "&format=json", true);
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
  /*var table = document.createElement('tbody');
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
    //addRecentTrackToCreeperBar(jsonTrackObj, "zachbwh", zachbwhProfileImage);
  }*/
  //document.getElementById("currentUserRecentTracks").appendChild(table);
}

function updateCreeperBarView () {
  var i;
  document.getElementById('creeperBar').innerHTML = "";
  for (i=0; i<currentModel.length; i++) {
    var userProfileImage;
    var username = currentModel[i].userInfo.user.name;
    if (currentModel[i].userInfo.user.image[3]["#text"] === "") {
      userProfileImage = document.createElement('img');
      userProfileImage.src = "https://lastfm-img2.akamaized.net/i/u/avatar170s/818148bf682d429dc215c1705eb27b98"
      userProfileImage.className = "profile-image";

    } else {
      userProfileImage = document.createElement('img');
      userProfileImage.src = currentModel[i].userInfo.user.image[3]["#text"];
      userProfileImage.className = "profile-image";
    }
  addRecentTrackToCreeperBar(currentModel[i].userRecentTracks.recenttracks.track[0], username, userProfileImage)
  }
  $( ".recentTrackListenerDiv" ).hover(function() {
    $( this ).css('background-color', '#333333');
  },
  function() {
    $( this ).css('background-color', '#111111');
  });

  $( ".profile-image" ).hover(function() {
    $( this ).css('background-color', '#333333');
  },
  function() {
    $( this ).css('background-color', '#111111');
  });
}

function addRecentTrackToCreeperBar(jsonTrackObj, username, userProfileImageObj) {
  var recentTrackDiv = document.createElement('div');
  recentTrackDiv.className = "recentTrackDiv recentTrackListenerDiv";
  recentTrackDiv.id = username;

  var profileImageLink = createUserLink(username);
  profileImageLink.innerHTML = "";
  profileImageLink.className = "profile-image-parent";
  profileImageLink.appendChild(userProfileImageObj)
  recentTrackDiv.appendChild(profileImageLink);

  var recentTrackTable = document.createElement('div');
  recentTrackTable.className = "recentTrackText";

  // Row 1 - Username and timeSincePlayed
  var row1 = document.createElement('p');
  row1.className = "recentTrackUsername";
  var userIcon = document.createElement('i');
  userIcon.className = "fa fa-user-o w3-margin-right recentTrackIcon";
  row1.appendChild(userIcon);
  var recentTrackUsername = createUserLink(username);
  row1.appendChild(recentTrackUsername);

  var row1Time = document.createElement('span');
  row1Time.className = "w3-right";
  row1Time.appendChild(document.createTextNode(" "));
  row1Time.appendChild(timeSincePlayed(jsonTrackObj));
  row1.appendChild(row1Time);

  // Row 2 - Track Name
  var row2 = document.createElement('p');
  row2.className = "recentTrackRow";
  var trackIcon = document.createElement('i');
  trackIcon.className = "fa fa-music w3-margin-right recentTrackIcon";
  row2.appendChild(trackIcon);
  row2.appendChild(createTrackLink(jsonTrackObj));

  // Row 3 - Artist Name
  var row3 = document.createElement('p');
  row3.className = "recentTrackRow";
  var artistIcon = document.createElement('i');
  artistIcon.className = "fa fa-user-o w3-margin-right recentTrackIcon";
  row3.appendChild(artistIcon);
  row3.appendChild(createArtistLink(jsonTrackObj));

  // Row 4 - Album Name
  var row4 = document.createElement('p');
  row4.className = "recentTrackRow"
  var albumIcon = document.createElement('i');
  albumIcon.className = "fa fa-music w3-margin-right recentTrackIcon";
  row4.appendChild(albumIcon);
  row4.appendChild(createAlbumLink(jsonTrackObj));

  recentTrackTable.appendChild(row1);
  recentTrackTable.appendChild(row2);
  recentTrackTable.appendChild(row3);
  recentTrackTable.appendChild(row4);

  recentTrackDiv.appendChild(recentTrackTable);
  document.getElementById("creeperBar").appendChild(recentTrackDiv)
}

function updateView() {
  // Update current user first
  //document.getElementById("currentUserDP").src = currentModel[0].userInfo.user.image[2]["#text"]; // update main user profile photo
  //document.getElementById("currentUserName").innerHTML = currentModel[0].userInfo.user.name.toUpperCase(); // update main user username
  //document.getElementById("CUTS").innerHTML = currentModel[0].userInfo.user.playcount.toString(); // update scrobble count

  updateCurrentUserRecentTracksView(currentModel[0].userRecentTracks);
  updateCreeperBarView()

}

setInterval(
  function(){console.log("updating");
  updateModel()}, 20000);

function fetchUserRecentTracks (username, api_key, limit) {
  var userRecentTracksRequest = new XMLHttpRequest();
  userRecentTracksRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var userRecentTracks = JSON.parse(this.responseText);
      displayPastSongs(limit, userRecentTracks, username);
    }
  };
  userRecentTracksRequest.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=" + api_key + "&format=json&limit=" + limit, true);
  userRecentTracksRequest.send();

}

function displayPastSongs (limit, jsonObj, username) {
  var tracks = "";
  tracks += "<a href='https://www.last.fm/user/" + username + "'>" + "<h3>" + jsonObj.recenttracks["@attr"].user + "</h3>" + "</a>";
  for (i = 0; i < limit; i++) {
    var iString = i.toString();
    if (jsonObj.recenttracks.track[i]["@attr"] != null) {
      tracks += "<b>";
      console.log(i);
    }
    tracks += jsonObj.recenttracks.track[i].artist["#text"];
    tracks += " — ";
    tracks += jsonObj.recenttracks.track[i].name;
    /*
    if (jsonObj.recenttracks.track[i].date["#text"] != null) {
      tracks += "<span style='float: right;'>";
      tracks += jsonObj.recenttracks.track[i].date["#text"];
      tracks += "</span>";
    }
    */
    if (jsonObj.recenttracks.track[i]["@attr"] != null  ) {
      tracks += "</b>";
    }
    tracks += "<br>";
  }
  if (username == currentUser) {
    document.getElementById("user").innerHTML = tracks;
  } else {
    document.getElementById(username).innerHTML = tracks;
  }
}

/* fetchUserFollowing is used to fetch the other last.fm users that a specific user is following using the user.getfriends method in the last.fm API
A programmer can choose to use their own API Key also.
The function calls displayUserFollowing to put the user information on the webpage
*/
function fetchUserFollowing (username, api_key, followingTrackLimit) {
  var userFriendsRequest = new XMLHttpRequest();
  userFriendsRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var userFriends = JSON.parse(this.responseText);
      displayUserFollowing(userFriends, api_key, followingTrackLimit);
    }
  };
  userFriendsRequest.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getfriends&user=" + username + "&api_key=" + api_key + "&format=json", true);
  userFriendsRequest.send();
}

function displayUserFollowing (jsonObj, api_key, followingTrackLimit) {
  var numberOfFriends = jsonObj.friends["@attr"].total;
  document.getElementById("userFollowing").innerHTML = "";
  for (i = 0; i < numberOfFriends; i++) {
    var username = jsonObj.friends.user[i].name;
    document.getElementById("userFollowing").innerHTML += "<p id=\"" + username + "\">" + "</p>";
    fetchUserRecentTracks(username, api_key, followingTrackLimit);
  }
}

function changeCurrentUser (newUsername) {
  currentUser = newUsername;
}

function fetchAll (username, api_key, userTrackLimit, followingTrackLimit) {
  changeCurrentUser(username);
  fetchUserRecentTracks(username, api_key, userTrackLimit);
  fetchUserFollowing(username, api_key, followingTrackLimit);
}

function periodicFetch (api_key, userTrackLimit, followingTrackLimit) {
    fetchUserRecentTracks(currentUser, "a0f6605fafd4fe8da5875bc7c04dca05", 10);
    fetchUserFollowing(currentUser, "a0f6605fafd4fe8da5875bc7c04dca05", 5);
}

websiteSearchCodes = [
  ["!g",  "google",               "https://www.google.co.nz/search?q="],
  ["!i",  "google images",        "https://www.google.com/search?tbm=isch&q="],
  ["!y",  "youtube",              "https://www.youtube.com/results?search_query="],
  ["!d",  "duckduckgo",           "https://duckduckgo.com/?q="],
  ["!aw", "arch wiki",            "https://wiki.archlinux.org/index.php?title=Special%3ASearch&search="],
  ["!au", "arch user repository", "https://aur.archlinux.org/packages/?O=0&K="],
  ["!u",  "urban dictionary",     "http://www.urbandictionary.com/define.php?term="],
  ["!m",  "imdb",                 "http://www.imdb.com/find?ref_=nv_sr_fn&q="],
  ["!gh", "github",               "https://github.com/search?utf8=✓&q="],
  ["!ge", "genius",               "https://genius.com/search?q="],
  ["!r",  "go to subreddit",      "http://www.reddit.com/r/"],
  ["!w",  "wikipedia",            "https://en.wikipedia.org/w/index.php?search="]
]



function handleKeyPress(event, searchString) {
  var foundSite = false;
  console.log(event.which);
  if (event.which == 13) {
    for (i = 0; i < websiteSearchCodes.length; i++) {
      if (searchString.endsWith(websiteSearchCodes[i][0]) && !foundSite) {
        searchStringSansBang = searchString.slice(0, -websiteSearchCodes[i][0].length)
        foundSite = true;
        window.location.href = websiteSearchCodes[i][2] + searchStringSansBang;
      }
    }
    if (!foundSite) {
      window.location.href = "https://www.google.co.nz/search?q=" + searchString;
    }
  }
}

var m = false

function toggle() {
  m = !m;
  console.log("hi");
  if (m) {
  document.getElementById("options").innerHTML = "-";
  document.getElementById("sites").style.opacity = 1;
} else {
  document.getElementById("options").innerHTML = "+";
  document.getElementById("sites").style.opacity = 0;
}
}

function handleQuery (event, query) {
  //console.log(event.which);
  var selected_emoji = document.getElementById("emoji-select");
  if (event.which == 38) { // up arrow key
  } else if (event.which == 40) { // down arrow key
  } else {
      results = search(query, "en");
      if (results.length != 0) {
        displayEmojis(results);
        //document.getElementById("output").innerHTML = results[0];
      } else {
        document.getElementById("output").innerHTML = "";
      }

  }
}

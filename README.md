# zachhuxford.io
A personal website to host a blog and small personal projects.

## [startpage](http://zachhuxford.io/startpage)
A simple "New Tab" page that opens every time I open a new tab or window in firefox.
The only significant feature it has is to directly search on a set of desired websites such as google, duckduckgo, and the archwiki.

A custom direct search can be performed by appending `!code` to the end of your search query where `code` is replaced with the desired website code.

For example if I wanted to search for pulseaudio on the archwiki I would enter into the input field:

`pulseaudio!aw`

followed by the enter key.

## [last.fm creeper](http://zachhuxford.io/lastfm)
A web page in which you can enter your last.fm username and it will retrieve some data about your last.fm account via the last.fm api such as your total scrobbles and 15 most recently played tracks. Future functionality will include a creeper bar similar to the one on Spotify for desktop except it will be using your followers on last.fm instead. Unfortunately the current implementation for fetching data is kind of hacky which is the reason for it taking about 10 seconds to load the information.

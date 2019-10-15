# last.fm bar

A webpage that keeps me up to date with what my friends are listening to in real time.

## Technical Details
Recent Track data is fetched and updated using [my personal api](https://github.com/zachbwh/api.zachhuxford.io) via a websocket connection.

Api.zachhuxford.io always maintains cached recent tracks for everyone my personal lastfm account is following and is constantly polling the lastfm API so keep those up to date.

Changes to the caches results on my server results in the updated information being transferred to the browser via the websocket connection.
const db = require("./db");
const ws = require("./websocket-client");
const fetch = require("node-fetch");

const wsClient = new ws.Client();

const success = {
  statusCode: 200,
};

async function connectionManager(event, context) {
  // we do this so first connect EVER sets up some needed config state in db
  // this goes away after CloudFormation support is added for web sockets
  await wsClient._setupClient(event);

  if (event.requestContext.eventType === "CONNECT") {
    await subscribe(event, context);

    return success;
  } else if (event.requestContext.eventType === "DISCONNECT") {
    await unsubscribe(event, context);

    return success;
  }
}

async function defaultMessage(event, context) {
  await wsClient.send(event, {
    event: "error",
    message: "invalid action type",
  });

  return success;
}

async function broadcastRecentTrackUpdate(newRecentTrack) {
  const connections = await db.fetchConnections();

  console.info(connections);
  
  const wsSendPromises = connections.map(async (connection) => {

    const connectionId = db.parseEntityId(connection[db.Connection.Primary.Range]);
    return wsClient.send(connectionId, {
      event: "recent_track_update",
      recentTrack: newRecentTrack,
    });
  });

  return Promise.all(wsSendPromises);
}

async function ddbStreamListener(event, context) {
  // Listen to ddb stream
  // Broadcast any recent track updates

  const recentTrackRecords = event.Records
    .filter(record => record.eventName)
    .filter(record => record.eventName === "INSERT" || record.eventName === "MODIFY")
    .filter(record => record.dynamodb)
    .filter(record => record.dynamodb.Keys[db.Primary.Key].S.split("|")[0] === db.RecentTrack.Entity)
    .sort((a, b) => a.SequenceNumber < b.SequenceNumber ? 1 : a.SequenceNumber > b.SequenceNumber ? -1 : 0);


  if (recentTrackRecords.length > 0) {
    const newRecentTrackRecord = recentTrackRecords[0];
    const newRecentTrack = JSON.parse(newRecentTrackRecord.dynamodb.NewImage.RecentTrack.S.replace(/\\/g, ""));
    await broadcastRecentTrackUpdate(newRecentTrack)
  }

  return success;
}

async function subscribe(event, context) {
  const connectionId = db.parseEntityId(event);
  await db.Client.put({
    TableName: db.Table,
    Item: {
      [db.Connection.Primary.Key]: db.Connection.Prefix,
      [db.Connection.Primary.Range]: `${db.Connection.Prefix}${connectionId}`,
    },
  }).promise();

  return success;
}

async function unsubscribe(event, context) {
  const connectionId = db.parseEntityId(event);
  await db.Client.delete({
    TableName: db.Table,
    Key: {
      [db.Connection.Primary.Key]: db.Connection.Prefix,
      [db.Connection.Primary.Range]: `${db.Connection.Prefix}${connectionId}`,
    },
  }).promise();

  return success;
}

async function pollRecentTrack() {
  try {
    const recentTrack = await getRecentTrack()

    await db.Client.put({
      TableName: db.Table,
      Item: {
        [db.RecentTrack.Primary.Key]: db.RecentTrack.Prefix,
        [db.RecentTrack.Primary.Range]: db.RecentTrack.Prefix,
        "RecentTrack": JSON.stringify(recentTrack)
      }
    }).promise();

  } catch (e) {
    console.error(e);
  }

  return success;
}

async function getRecentTrack() {
  const username = process.env.LASTFM_USERNAME || 'zachbwh'
  
  const queryString = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=1`;

  const reponse = await fetch(queryString),
      recentTracks = await reponse.json();
  
  if (recentTracks.recenttracks.track.length < 1) {
    const err = `There are no recent tracks for the lastfm user: ${username}`;
    response = responders.clientError(err);

    throw new Error(err);
  }
  
  // Shaping Recent Track Object
  const recentTrack = recentTracks.recenttracks.track[0];
  delete recentTrack.image;
  if (recentTrack.date && recentTrack.date["#text"]) {
      delete recentTrack.date["#text"];
  }
  delete recentTrack.url;
  delete recentTrack.streamable;

  return recentTrack;
};

async function requestRecentTrack(event) {
  const connectionId = db.parseEntityId(event);
  const recentTrack = await db.fetchRecentTrack();

  await wsClient.send(connectionId, {
    event: "recent_track_update",
    recentTrack: JSON.parse(recentTrack),
  });

  return success;
}

module.exports = {
  connectionManager,
  defaultMessage,
  subscribe,
  unsubscribe,
  ddbStreamListener,
  pollRecentTrack,
  requestRecentTrack
};

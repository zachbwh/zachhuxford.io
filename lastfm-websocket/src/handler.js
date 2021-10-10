const db = require("./db");
const ws = require("./websocket-client");

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

async function sendMessage(event, context) {
  const body = JSON.parse(event.body);

  const recentTrack = JSON.parse(body.recentTrack);

  await broadcastRecentTrackUpdate(recentTrack);

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
    .filter(record => record.eventName === "INSERT")
    .filter(record => record.dynamodb)
    .filter(record => record.dynamodb.Keys[db.Primary.Key].S.split("|")[0] === db.RecentTrack.Entity)
    .sort((a, b) => a.SequenceNumber > b.SequenceNumber ? 1 : a.SequenceNumber > b.SequenceNumber ? -1 : 0);

  const newRecentTrackRecord = recentTrackRecords[0];

  if (newRecentTrackRecord) {
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

module.exports = {
  connectionManager,
  defaultMessage,
  sendMessage,
  subscribe,
  unsubscribe,
  ddbStreamListener
};

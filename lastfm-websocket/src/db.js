const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

const db = {
    Table: process.env.APPLICATION_TABLE,
    Primary: {
        Key: 'pk',
        Range: 'sk'
    },
    Connection: {
        Primary: {
            Key: 'pk',
            Range: 'sk'
        },
        Prefix: 'CONNECTION|',
        Entity: 'CONNECTION'
    },
    RecentTrack: {
        Primary: {
            Key: 'pk',
            Range: 'sk'
        },
        Prefix: 'RECENTTRACK|',
        Entity: 'RECENTTRACK'
    }
}

const recentTrackRegex = new RegExp(`^${db.RecentTrack.Entity}\|`);
const connectionRegex = new RegExp(`^${db.Connection.Entity}\|`);

function parseEntityId(target){
    if (typeof target === 'object'){
        // use from raw event, only needed for connectionId at the moment
        target = target.requestContext.connectionId;
    } else {
        // strip prefix if set so we always get raw id
        target = target
            .replace(recentTrackRegex, '')
            .replace(connectionRegex, '');
    }

    return target.replace('|', ''); // why?!
}

async function fetchConnections(){
    let connectionsResults;
    try {
        connectionsResults = await ddb.query({
            TableName: db.Table,
            KeyConditionExpression: `${db.Connection.Primary.Key} = :connectionKey and begins_with(${db.Connection.Primary.Range}, :connectionEntity)`,
            ExpressionAttributeValues: {
                ":connectionKey": db.Connection.Prefix,
                ":connectionEntity": db.Connection.Prefix
            }
        }).promise();

    } catch (e) {
        console.error(e);
    }

    return connectionsResults.Items;
}


const client = {
    ...db,
    parseEntityId,
    fetchConnections,
    Client: ddb
}

module.exports = client
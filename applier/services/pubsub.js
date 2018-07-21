const PubSub = require(`@google-cloud/pubsub`);
// Creates a client
// const pubsub = new PubSub();
const projectId = process.env.PROJECT_ID || 'noga-autocomplete';
const pubsub = new PubSub({
    projectId: projectId,
});

// names:  "sub-autocomplete-asia","sub-autocomplete-eu","sub-autocomplete-us"
const subscriptionName = process.env.SUB_AUTO || 'sub-autocomplete-us';
const subscription = pubsub.subscription(subscriptionName);

let messageCount = 0;
const messageHandler = message => {
    console.log(`=========Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    messageCount += 1;
    // "Ack" (acknowledge receipt of) the message
    try {
        // TODO: import data in redis
        message.ack();
    } catch (err) {
        console.error('ERROR:', err);
    }

};

var _service = {};
_service.start = () => subscription.on(`message`, messageHandler);
_service.stop = () => subscription.removeListener('message', messageHandler);

module.exports = _service;
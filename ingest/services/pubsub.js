const dataloader = require('./loader');
const PubSub = require(`@google-cloud/pubsub`);

// Creates a client
// const pubsub = new PubSub();
const projectId = process.env.PROJECT_ID || 'noga-autocomplete';
const pubsub = new PubSub({
  projectId: projectId,
});
/**
 * TODO(developer): Uncomment the following lines to run the sample.
 */
const subscriptionName = process.env.SUB_PRODUCT || 'sub-product';
// References an existing subscription
const subscription = pubsub.subscription(subscriptionName);

// Create an event handler to handle messages
let messageCount = 0;
const messageHandler = message => {
  console.log(`=========Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  messageCount += 1;
  // "Ack" (acknowledge receipt of) the message
  try {
    dataloader.start();
    message.ack();
  } catch (err) {
    console.error('ERROR:', err);
  }

};
// const _listener = {
//     "start": ()=> subscription.on(`message`, messageHandler),
//     "stop": subscription.removeListener('message', messageHandler)

//     }
// };
var _listener = {};
_listener.start = () => subscription.on(`message`, messageHandler);
_listener.stop = () => subscription.removeListener('message', messageHandler);
module.exports = _listener;
// subscription.removeListener('message', messageHandler);
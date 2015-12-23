// Import AppDispatcher to register the store
var AppDispatcher = require('../dispatcher/AppDispatcher');
// Import EventEmitter to add and remove event listeners from the store.
var EventEmitter = require('events').EventEmitter;
// Import object-assign module that copies properties from multiple source objects to a single target object
var assign = require('object-assign');


// TweetStore manages a simple tweet object that we initially set to null to identify that we didn't receive the new tweet yet
var tweet = null;

// These are private methods

// setTweet() is not a method on the TweetStore object whereas getTweet() is.
// The only way to update data in any store is to create an action and dispatch it using a dispatche to store that has registered with that dispatcher.
function setTweet(receivedTweet) {
  tweet = receivedTweet
}

function emitChange() {
  TweetStore.emit('change');
}

// addChangeListener and removeChangeLister depends on methods provided by the EventEmitter.prototype object.
// need to copy  the methods from EventEmitter.prototype to the TweetStore object using assign();
// targetObject = assign(targetObject, sourceObject1, sourceObject2);

var TweetStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  getTweet: function() {
    return tweet;
  }
});

// create an action handler and registering the store with a dispatcher.

// In flux, all stores get all the actions but now all stores are interested in all the actions, so each store must decide what actions it's interested in by checking the type.

// Then call a private method setTweet() function to update the tweet object with a new one that comes from the action object: action.tweet

// When the store changes its data, it needs to tell everyone who is interested in the data change. The store calls the private emitChange() function that emits the change event and triggers all the event listeners created by other parts in our app

function handleAction(action) {
  if (action.type === 'receive_tweet') {
    setTweet(action.tweet);
    emitChange();
  }
}

// Register store with a dispatcher
// call dispatcher's register() method and pass the store's action handler function to it as a callbasck. Whenever the dispatcher dispatches an action, it calls that callback and passes the action object to it.

// register() returns a token that identifies TweetStore, we can use it in other methods of AppDispatcher. We also save that token as a property of TweetStore object.

TweetStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = TweetStore;

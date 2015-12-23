var AppDispatcher = require('../dispatcher/AppDispatcher');

function receiveTweet(tweet){

  console.log('ive received a new tweet and now will dispatch it together with a new action.');

  var action = {
    type: 'receive_tweet',
    tweet: tweet
  };

  AppDispatcher.dispatch(action);
}

module.exports = {
  receiveTweet: receiveTweet
};

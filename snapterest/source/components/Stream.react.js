var React = require('react');
// var SnapkiteStreamClient = require('snapkite-stream-client');
var StreamTweet = require('./StreamTweet.react');
var Header = require('./Header.react');
var TweetStore = require('../stores/TweetStore');

var Stream = React.createClass({
  getInitialState: function() {
    // 1 set the component's inital tweet to the latest tweet that we get from TweetStore by using the getTweet() method
    return {
      tweet: TweetStore.getTweet()
    }
  },
  componentDidMount: function() {
    // 2 listen to changes on TweetStore
    TweetStore.addChangeListener(this.onTweetChange);
  },
  onTweetChange: function() {
    // 3 when TweetStore changes its tweet, update the component's state to the latest tweet that we get from TweetStore by using the getTweet() method
    this.setState({
      tweet: TweetStore.getTweet()
    });
  },
  componentWillUnmount: function() {
    // 4 when the component is about to unmount we stop listening to the changes in TweetStore
    TweetStore.removeChangeListener(this.onTweetChange);
  },
  render: function() {
    var tweet = this.state.tweet;

    if (tweet){
      return (
        <StreamTweet tweet={tweet} />
      );
    }

    return (
      <Header text="Waiting for public photos from Twitter .... " />
    )
  }
});

module.exports = Stream;

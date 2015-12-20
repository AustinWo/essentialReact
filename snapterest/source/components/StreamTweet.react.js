var React = require('react');
var ReactDOM = require('react-dom');
var Header = requrire('./Header.react');
var Tweet = require('./Tweet.react');

var StreamTweet = React.createClass({
  getInitialStage: function(){
    console.log('[Snapterest] StreamTweet: 1. Running getInitialStage()');

    return {
      numberOfCharactersIsIncreasing: null,
      headerText: null
    };
  },
  componentWillMount: function(){
    console.log('[Snapterest] StreamTweet: 2. Running componentWillMount()');

    this.setState({
      numberOfCharactersIsIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    });

    window.Snapterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayTweets: 1
    };
  },
  componentDidMount: function(){
    console.log('[Snapterest] StreamTweet: 3. Running componentDidMount()');

    var componentDOMRepresentation = ReactDOM.findDOMNode(this);

    window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
    window.snapterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML;
  },
  componentWillUnmount: function(){
    console.log('[Snapterest] StreamTweet: 8. Running componentWillUnmount()');

    delete window.snapterest;
  },
  render: function(){
    console.log('[Snapterest] StreamTweet: Running render()');

    return (
      <section>
        <Header text={this.state.headerText} />
        <Tweet
          tweet={this.props.tweet}
          onImageClick={this.props.onAddTweetToCollection} />
      </section>
    );
  }
});

module.exports = StreamTweet;

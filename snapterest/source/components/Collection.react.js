var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');
var CollectionUtils = require('../utils/CollectionUtils');
var CollectionStore = require('../stores/CollectionStore');

var Collection = React.createClass({

  getInitialState: function() {
    // set the collection of tweets to what is stored in CollectionStore at the moment
    return {
      collectionTweets: CollectionStore.getCollectionTweets()
    };
  },

  componentDidMount: function() {
    // add the change event listener this.onCollectionChange to CollectionStore
    // whenever the collection of tweets is updated, CollectionStore will call this.onCollectionChange callback to notify the Collection component of that change
    CollectionStore.addChangeListener(this.onCollectionChange);
  },

  componentWillUnmount: function() {
    // remove the this.onCollectionChange change listener
    CollectionStore.removeChangeListener(this.onCollectionChange);
  },

  onCollectionChange: function() {
    // set the component state to whatever is stored in CollectionStore at the moment in time. Updating the component's state triggers rerendering
    this.setState({
      collectionTweets: CollectionStore.getCollectionTweets()
    });
  },

  createHtmlMarkupStringOfTweetList: function(){
    var htmlString = ReactDOMServer.renderToStaticMarkup(
      <TweetList tweets={this.state.collectionTweets} />
    );

    var htmlMarkup = {
      html: htmlString
    };

    return JSON.stringify(htmlMarkup);
  },

  render: function(){
    var CollectionTweets = this.state.collectionTweets;
    var numberOfTweetsInCollection = CollectionUtils.getNumberOfTweetsInCollection(this.state.collectionTweets);
    var htmlMarkup;

    if (numberOfTweetsInCollection > 0){
      var htmlMarkup = this.createHtmlMarkupStringOfTweetList();

      return (
        <div>

          <CollectionControls
            numberOfTweetsInCollection={numberOfTweetsInCollection}
            htmlMarkup={htmlMarkup} />

          <TweetList
            tweets={this.state.collectionTweets} />

        </div>
      );
    }

    return <Header text="Your collection is empty" />;
  }
});

module.exports = Collection;

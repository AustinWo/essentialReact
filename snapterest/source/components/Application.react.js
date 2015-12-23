var React = require('react');
var Stream = require('./Stream.react');
var Collection = require('./Collection.react');

// The adoption of Flux architecture allows the Stream component to manage the latest tweet, and the Collection component to manage the collection of tweets, where as Application component doesnt manage anything anymore

// So Application component becomes a container component that wraps the Stream and Collection components in the additional HTML markup

var Application = React.createClass({
  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="cold-md-4 text-center">
            <Stream />
          </div>

          <div className="cold-md-8">
            <Collection />
          </div>

        </div>
      </div>
    );
  }
});

module.exports = Application;


var React = require('react');

// In React, we can defone CSS rules in a JavaScript object and pass to object as a value to React element's style property
var headerStyle = {
  fontSize: '16px',
  fontWeight: '300',
  display: 'inline-block',
  margin: '20px 10px'
};

// Header is a stateless component that renders the h2 element
// header text is passed from parent component via this.props.text
// makes this component flexible and allows for reuse
var Header = React.createClass({

  getDefaultProps: function() {
    return {
      text: 'Default header'
    };
  },

  render: function() {
    return(
      <h2 style={headerStyle}>{this.props.text}</h2>
    );
  }
});

module.exports = Header;

var React = require('react');
var ReactDOM = require('react-dom');

// var listOfItems = <ul className="list-of-items">
//   <li className="item-1">Item 1</li>
//   <li className="item-2">Item 2</li>
//   <li className="item-3">Item 3</li>
// </ul>;

// ReactDOM.render(listOfItems, document.getElementById('react-application'));

var ReactClass = React.createClass({
  getInitialState: function(){
    return {
      isHeaderHidden: false
    };
  },
  handleClick: function(){
    this.setState({
      isHeaderHidden: !this.state.isHeaderHidden
    });
  },
  render: function(){

    var title = 'Stateful React Componentz';
    var headerElement = React.createElement('h1', { className: 'header', key: 'header'}, title);
    // var focusShowButtonEl = React.createElement('button', {className: 'btn btn-default', onMouseOver: this.handleClick, key: 'focusShowButton'}, 'Focus to show');
    // var focusHideButtonEl = React.createElement('button', {className: 'btn btn-default', onMouseOver: this.handleClick, key: 'focusHideButton'}, 'Focus to hide');
    var buttonElement = React.createElement('button', { className: 'btn btn-default', onClick: this.handleClick, key: 'button' }, 'Toggle header');

    if (this.state.isHeaderHidden){
      return React.createElement('div', null, [ buttonElement ]);
    }

    return React.createElement('div', null, [ buttonElement, headerElement ]);
  }
});

var reactComponentElement = React.createElement(ReactClass);
var reactComponent = ReactDOM.render(reactComponentElement, document.getElementById('react-application'));

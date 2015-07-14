import React from 'react';

var remote = window.require('remote');

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="title-bar">App</div>
      </div>
    );
  }
}

React.render(<App/>, document.body);
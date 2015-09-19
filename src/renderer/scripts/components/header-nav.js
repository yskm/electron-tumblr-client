import React from 'react';

export default class HeaderNav extends React.Component {
  render() {
    return (
      <div className="ui vertical icon menu">
        <a className="ui item" href="#">
          <i className="ellipsis vertical icon"></i>
        </a>
        <a className="ui item" href="#">
          <i className="large user icon"></i>
        </a>
        <a className="ui item" href="#">
          <i className="large icons">
            <i className="user icon"></i>
            <i className="inverted corner heart icon"></i>
          </i>
        </a>
        <a className="ui item" href="#">
          <i className="large sign out icon"></i>
        </a>
      </div>
    );
  }
}
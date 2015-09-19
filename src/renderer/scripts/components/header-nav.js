import React from 'react';

export default class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
  }
  onClosedNavClick(e) {
    e.preventDefault();
    this.setState({isOpened: true});
  }
  onOpenedNavClick(e) {
    e.preventDefault();
    this.setState({isOpened: false});
  }
  render() {
    if (this.state.isOpened) {
      return (
        <div className="ui vertical icon menu">
          <a className="ui item" href="#" onClick={this.onOpenedNavClick.bind(this)}>
            <i className="ellipsis vertical icon"></i>
          </a>
          <a className="ui item" href="#">
            <i className="user icon"></i>
          </a>
          <a className="ui item" href="#">
            <i className="icons">
              <i className="user icon"></i>
              <i className="inverted corner heart icon"></i>
            </i>
          </a>
          <a className="ui item" href="#">
            <i className="sign out icon"></i>
          </a>
        </div>
      )
    }
    return (
      <div className="ui vertical icon menu">
        <a className="ui item" href="#" onClick={this.onClosedNavClick.bind(this)}>
          <i className="ellipsis vertical icon"></i>
        </a>
      </div>
    );
  }
}
import React from 'react';

export default class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
  }

  get subIcons() {
    if (!this.state.isOpened) {
      return;
    }
    return (
      <div>
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
    );
  }

  toggleNav(e) {
    e.preventDefault();
    this.setState({isOpened: !this.state.isOpened});
  }

  render() {
    return (
      <div className="ui vertical icon menu">
        <a className="ui item" href="#" onClick={this.toggleNav.bind(this)}>
          <i className="ellipsis vertical icon"></i>
        </a>
        {this.subIcons}
      </div>
    );
  }
}
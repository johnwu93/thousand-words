import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class AuthenticatedNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnLogout = this.handleOnLogout.bind(this);
  }

  handleOnLogout() {
    Meteor.logout(() => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <Nav>
          <LinkContainer to="/map">
            <NavItem eventKey={1} href="/map">Map</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={2} title={this.props.name} id="user-nav-dropdown">
            <LinkContainer to="/profile">
              <NavItem eventKey={2.1} href="/profile">Profile</NavItem>
            </LinkContainer>
            <MenuItem divider />
            <MenuItem eventKey={2.2} onClick={this.handleOnLogout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AuthenticatedNavigation);

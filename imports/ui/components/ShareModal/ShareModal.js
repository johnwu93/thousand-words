import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Modal, Button } from 'react-bootstrap';

import './ShareModal.scss';

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Button className="share-button" onClick={this.open} bsStyle="primary">
          Share Map
        </Button>
        <Modal
          className="ShareModal"
          ref={modal => (this.modal = modal)}
          show={this.state.showModal}
          onHide={this.close}
        >
          <Modal.Body ref={body => (this.body = body)}>
            <h4 className="text-center">You brought your past experiences to life. <br />It's time to share it 🎉</h4>
            <h5 className="text-center">{`http://localhost:3000/${this.props.shortenUrl}`}</h5>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ShareModal.propTypes = {
  shortenUrl: PropTypes.string.isRequired,
};

export default createContainer((props) => {
  const shortenUrl = props.shortenUrl ? props.shortenUrl : '';
  return { shortenUrl };
}, ShareModal);

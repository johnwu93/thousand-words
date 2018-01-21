import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, Button } from 'react-bootstrap';

import './ShareModal.scss';

const SHARE_URL = `http://localhost:3000/map/${Meteor.userId()}`;

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
            <h5 className="text-center">{SHARE_URL}</h5>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ShareModal;

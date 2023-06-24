import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

const ModalRoot = document.querySelector('#ModalRoot');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props.image;

    return createPortal(
      <div onClick={this.onClose} className="overlay">
        <div className="modal">
          <img src={largeImageURL} alt="img" />
        </div>
      </div>,
      ModalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};

export default Modal;

import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal';

import './ImageGalleryItem.css';

class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
  };

  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };

  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    return (
      <li className="imageGalleryItem">
        <img
          onClick={this.onModal}
          className="imageGalleryItem__image"
          src={webformatURL}
          alt="img"
        />
        {this.state.shownModal && <Modal onClose={this.onModal} image={item} />}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImageGalleryItem;

import ImageGalleryItem from 'components/imageGalleryItem';
import PropTypes from 'prop-types';

import './ImageGallery.css';

const ImageGallery = ({ items }) => {
  return (
    <ul className="imageGallery">
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array,
};

export default ImageGallery;

import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ onClick }) => {
  return (
    <button className="button-load" onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;

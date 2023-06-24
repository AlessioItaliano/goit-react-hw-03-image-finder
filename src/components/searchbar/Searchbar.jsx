import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';
import './Searchbar.css';

class Searchbar extends Component {
  state = {
    inputData: '',
  };

  onChangeInput = e => {
    this.setState({ inputData: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputData);
    this.setState({ inputData: '' });
  };

  render() {
    const { inputData } = this.state.inputData;

    return (
      <header className="searchbar">
        <form className="searchbar__form" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchbar__button">
            <ImSearch size={25} />
          </button>

          <input
            className="searchbar__input"
            name="inputData"
            value={inputData}
            onChange={this.onChangeInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

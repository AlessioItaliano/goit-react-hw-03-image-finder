import { Component } from 'react';

import Searchbar from 'components/searchbar';
import ImageGallery from 'components/imageGallery';
import Loader from 'components/loader';
import Button from 'components/button';

import fetchImg from './services/fetchImg';
import Notiflix from 'notiflix';
import { AppContainer, Message } from './App.styled.jsx';

let page = 1;

class App extends Component {
  state = {
    inputData: '',
    items: [],

    status: 'idle',
    totalHits: 0,
  };

  handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImg(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };
  onNextPage = async () => {
    this.setState({ status: 'pending' });

    try {
      const { hits } = await fetchImg(this.state.inputData, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };
  render() {
    const { totalHits, status, items } = this.state;

    if (status === 'idle') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
        </AppContainer>
      );
    }
    if (status === 'pending') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </AppContainer>
      );
    }
    if (status === 'rejected') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <Message />
          Something wrong, try later
        </AppContainer>
      );
    }
    if (status === 'resolved') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
        </AppContainer>
      );
    }
  }
}

export default App;

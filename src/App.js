import "./App.css";
import { Component } from "react";
import api from "./services/api.js";

import { Searchbar } from "./components/Searchbar/Searchbar.jsx";
import { ImageGallery } from "./components/ImageGallery/ImageGallery.jsx";
import { Button } from "./components/Button/Button.jsx";
import { Loader } from "./components/Loader/Loader.jsx";
import { Modal } from "./components/Modal/Modal.jsx";

import { Wrapper, ErrorText, EmptyText } from "./App.styled.js";

class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    isLoading: false,
    error: null,
    selectedImage: null,
  };

  componentDidUpdate(previousProps, previousState) {
    const { query, page } = this.state;

    if (previousState.query !== query || previousState.page !== page) {
      this.setState({ isLoading: true, error: null });

      api
        .fetchImages(query, page)
        .then((newImages) => {
          this.setState((previous) => ({
            images: page === 1 ? newImages : [...previous.images, ...newImages],
          }));
        })
        .catch((error) => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSearch = (query) => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState((previous) => ({
      page: previous.page + 1,
    }));
  };

  openModal = (image) => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, error, selectedImage } = this.state;

    const isEmpty = !isLoading && images.length === 0 && this.state.query;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSearch} />

        {error && <ErrorText>Error: {error.message}</ErrorText>}

        {isLoading && <Loader />}

        {isEmpty && <EmptyText>No found results!</EmptyText>}

        <ImageGallery images={images} onImageClick={this.openModal} />

        {images.length > 0 && <Button onClick={this.handleLoadMore} />}

        {selectedImage && (
          <Modal
            largeImageURL={selectedImage.largeImageURL}
            tags={selectedImage.tags}
            onClose={this.closeModal}
          />
        )}
      </Wrapper>
    );
  }
}

export default App;

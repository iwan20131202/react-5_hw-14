import { Component } from "react";

import { Overlay, Image } from "./Modal.styled.js";

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <div>
          <Image src={largeImageURL} alt={tags} />
        </div>
      </Overlay>
    );
  }
}
import React, { Component } from "react";
import Styles from "./ImagesContainer.module.css";
import { RightArrowIcon, LeftArrowIcon } from "../../../images/Images";

class ImagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      images: props.images,
    };
  }

  handleNextImage = () => {
    this.setState((prevState) => ({
      currentImageIndex:
        (prevState.currentImageIndex + 1) % prevState.images.length,
    }));
  };

  handlePrevImage = () => {
    this.setState((prevState) => ({
      currentImageIndex:
        (prevState.currentImageIndex - 1 + prevState.images.length) %
        prevState.images.length,
    }));
  };

  render() {
    const { currentImageIndex, images } = this.state;

    return (
      <div data-testid='product-gallery' className={Styles.container}>
        {/* Left Column Images */}
        <div className={Styles.ColumnImagesContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className={Styles.thumbnail}
              onClick={() => this.setState({ currentImageIndex: index })}
            />
          ))}
        </div>

        {/* Right Image Carousel */}
        <div className={Styles.caroselContainer}>
          <div className={Styles.caroselImage}>
            <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} />
          </div>
          <div className={Styles.rightArrow} onClick={this.handleNextImage}>
            <RightArrowIcon />
          </div>
          <div className={Styles.leftArrow} onClick={this.handlePrevImage}>
            <LeftArrowIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default ImagesContainer;
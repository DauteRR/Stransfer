import React, { Component } from "react";
import "./DownloadableImage.scss";

interface DownloadableImageProps {
  width: number;
  height: number;
  dataUrl: string;
  alt: string;
  imageName: string;
  date: number;
  deleteImage: Function;
}

interface DownloadableImageState {
  isImageLoaded: boolean;
}

class DownloadableImage extends Component<
  DownloadableImageProps,
  DownloadableImageState
> {
  canvasRef = React.createRef<HTMLCanvasElement>();
  imageRef = React.createRef<HTMLImageElement>();

  state = {
    isImageLoaded: false
  };

  getImageElement() {
    const image = this.imageRef.current;

    if (!image) throw new Error("Image reference error");

    return image;
  }

  getCanvasElement() {
    const canvas = this.canvasRef.current;

    if (!canvas) throw new Error("Canvas reference error");

    return canvas;
  }

  getDownloadButton() {
    if (this.state.isImageLoaded) {
      return (
        <a download={this.props.imageName} href={this.props.dataUrl}>
          <span
            className="options__download-icon"
            title="Download"
            aria-label="Download"
          >
            D
          </span>
        </a>
      );
    } else {
      return <p>{`"${this.props.imageName}"`} not available yet</p>;
    }
  }

  onImageLoad = () => {
    const context = this.getCanvasElement().getContext("2d");
    if (context) {
      context.drawImage(
        this.getImageElement(),
        0,
        0,
        this.props.width,
        this.props.height
      );
      this.setState({ isImageLoaded: true });
    }
  };

  render() {
    return (
      <div className="DownloadableImage">
        <div className="DownloadableImage__options">
          <button
            onClick={() => this.props.deleteImage(this.props.date)}
            className="options__delete-button"
            title="Delete"
            aria-label="Delete"
          >
            &times;
          </button>
          {this.getDownloadButton()}
        </div>
        <canvas
          width={this.props.width}
          height={this.props.height}
          ref={this.canvasRef}
          hidden
        />
        <img
          className="DownloadableImage__image"
          src={this.props.dataUrl}
          alt={this.props.alt}
          width={this.props.width}
          height={this.props.height}
          onLoad={this.onImageLoad}
          ref={this.imageRef}
        />
      </div>
    );
  }
}

export default DownloadableImage;

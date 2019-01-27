import React, { Component } from "react";
import Camera from "../Camera/Camera";
import DownloadableImageList from "../DownloadableImageList";
import * as IdbUtils from "../../utils/indexedDatabase";
import * as MediaUtils from "../../utils/mediaUtils";
import { MAX_DIMENSIONS } from "../../utils/dimensions";
import { IImageData } from "../../utils/IImageData";
import "./App.scss";

//@ts-ignore
import ml5 from "ml5";
import styleInfos from "../../utils/StyleInfos";
import {
  IDimensions,
  getMaxDimensionsRespectingAspectRatio
} from "../../utils/dimensions";
import { NEG_ONE } from "long";

interface Style {
  transfer: (
    video: HTMLMediaElement | HTMLImageElement
  ) => Promise<HTMLImageElement>;
}

interface AppState {
  imageData: IImageData[];
  selectedStyle: string;
  styleTransfer: Style | null;
  loadingStyle: boolean;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    imageData: [],
    styleTransfer: null,
    selectedStyle: "None",
    loadingStyle: false
  };

  componentDidMount() {
    IdbUtils.getAllImageData().then(imageDataList =>
      this.setState({ imageData: imageDataList })
    );
  }

  private _deleteImage = (key: number) => {
    IdbUtils.deleteImageData(key);
    this.setState(({ imageData }) => ({
      imageData: imageData.filter(({ date }) => date !== key)
    }));
  };

  private async _loadImage(
    media: HTMLImageElement | HTMLVideoElement,
    dimensions: IDimensions
  ) {
    const blob = await MediaUtils.mediaToBlob(media, dimensions);
    const date = Date.now();
    const newImageData = { date, blob, ...dimensions };

    IdbUtils.saveImageData(newImageData);
    this.setState(prevState => ({
      imageData: [...prevState.imageData, newImageData]
    }));
  }

  private _onNewPhoto = async (media: HTMLVideoElement | HTMLImageElement) => {
    const cameraAspectRatio = MediaUtils.getAspectRatio(media);
    const dimensions = getMaxDimensionsRespectingAspectRatio(cameraAspectRatio);

    // Only on images because we know that the video will not change its
    // dimensions. Images on the other hand are uploaded by the user, they can
    // have any width & height
    if (media instanceof HTMLImageElement) {
      media.width = MAX_DIMENSIONS.width;
      media.height = MAX_DIMENSIONS.height;
    }

    // No style transfer means simple photo
    if (!this.state.styleTransfer) {
      this._loadImage(media, dimensions);
    } else {
      const img = await this.state.styleTransfer.transfer(media);

      // The image source may not be loaded, in that case we wait for the event
      if (img.complete) {
        this._loadImage(img, dimensions);
      } else {
        img.addEventListener(
          "load",
          this._loadImage.bind(this, img, dimensions),
          { once: true }
        );
      }
    }
  };

  private _onImageInputted = ({ target }: { target: HTMLInputElement }) => {
    // Must be one and only one image inputted
    if (!target.files || target.files.length !== 1) {
      return;
    }
    const imgBlob = target.files[0];
    const img = new Image();
    const imgUrl = URL.createObjectURL(imgBlob);
    img.src = imgUrl;
    img.onload = async () => {
      URL.revokeObjectURL(imgUrl);
      this._onNewPhoto(img);
    };
    // Reset the input
    target.value = "";
  };

  private _onStyleSelection = async (name: string, pathToModel: string) => {
    this.setState({ loadingStyle: true });

    const styleTransfer = await ml5.styleTransfer(pathToModel);

    this.setState({
      styleTransfer,
      selectedStyle: name,
      loadingStyle: false
    });
  };

  render() {
    return (
      <div className="centered">
        {this.state.loadingStyle && (
          <div className="loading-style-info">Loading Style</div>
        )}
        <h2>Select the style to apply</h2>
        <ul className="style-list">
          <li>
            <label
              className={`style-list__style-option ${
                this.state.selectedStyle === "None"
                  ? "style-list__style-option--selected"
                  : ""
              }`}
            >
              <div className="style-option__img--none" />
              <button
                className="style-option__btn"
                onClick={() =>
                  this.setState({
                    styleTransfer: null,
                    selectedStyle: "None",
                    loadingStyle: false
                  })
                }
              >
                None
              </button>
            </label>
          </li>
          {styleInfos.map(({ name, pathToImage, pathToModel }) => (
            <li key={name}>
              <label
                className={`style-list__style-option ${
                  this.state.selectedStyle === name
                    ? "style-list__style-option--selected"
                    : ""
                }`}
              >
                <img
                  className="style-option__img"
                  src={pathToImage}
                  alt={`Image of the "${name}" style`}
                />
                <button
                  className="style-option__btn"
                  onClick={() => this._onStyleSelection(name, pathToModel)}
                  disabled={this.state.loadingStyle}
                >
                  {name}
                </button>
              </label>
            </li>
          ))}
        </ul>
        <h2>Take a picture or choose an image from your device</h2>
        <section className="input-section">
          <Camera onNewPhoto={this._onNewPhoto} />
          <label className="input-section__file-input">
            <input
              disabled={this.state.loadingStyle}
              type="file"
              accept="image/*"
              multiple={false}
              onChange={this._onImageInputted}
              style={{
                display: "none"
              }}
            />
            Open image from disk
          </label>
        </section>
        <h2>Results</h2>
        {this.state.imageData.length === 0 ? (
          <p>No images available</p>
        ) : (
          <DownloadableImageList
            imageData={this.state.imageData}
            deleteImage={this._deleteImage}
          />
        )}
      </div>
    );
  }
}

export default App;

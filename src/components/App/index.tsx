import React, { Component } from "react";
import Camera from "../Camera/Camera";
import DownloadableImageList from "../DownloadableImageList";
import * as IdbUtils from "../../utils/indexedDatabase";
import * as MediaUtils from "../../utils/mediaUtils";
import { IImageData } from "../../utils/IImageData";
import "./App.scss";
//@ts-ignore
import ml5 from "ml5";
import {
  IDimensions,
  getMaxDimensionsRespectingAspectRatio
} from "../../utils/dimensions";

interface AppState {
  imageData: IImageData[];
  styleTransfer?: Promise<any>;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    imageData: []
  };

  componentDidMount() {
    this.setState({ styleTransfer: ml5.styleTransfer("models/scream") });

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

  private _onNewPhoto = async (video: HTMLVideoElement) => {
    if (!this.state.styleTransfer) {
      return;
    }

    const cameraAspectRatio = MediaUtils.getAspectRatio(video);
    const dimensions = getMaxDimensionsRespectingAspectRatio(cameraAspectRatio);
    const style = await this.state.styleTransfer;
    const img = await style.transfer(video);

    if (img.complete) {
      this._loadImage(img, dimensions);
    } else {
      img.addEventListener(
        "load",
        this._loadImage.bind(this, img, dimensions),
        { once: true }
      );
    }
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

  render() {
    return (
      <div className="centered">
        <Camera onNewPhoto={this._onNewPhoto} />
        <DownloadableImageList
          imageData={this.state.imageData}
          deleteImage={this._deleteImage}
        />
      </div>
    );
  }
}

export default App;

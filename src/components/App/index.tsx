import React, { Component } from "react";
import Camera from "../Camera";
import DownloadableImageList from "../DownloadableImageList";
import * as MediaUtils from "../../utils/mediaUtils";
import * as IdbUtils from "../../utils/indexedDatabase";
import { getMaxDimensionsRespectingAspectRatio } from "../../utils/dimensions";
import { IImageData } from "../../utils/IImageData";
import "./App.scss";

interface AppState {
  imageData: IImageData[];
}

class App extends Component<{}, AppState> {
  cameraRef = React.createRef<Camera>();

  state = {
    imageData: []
  };

  componentDidMount() {
    IdbUtils.getAllImageData().then(imageDataList =>
      this.setState({ imageData: imageDataList })
    );
  }

  onNewPhoto = async () => {
    const camera = this.cameraRef.current;
    if (!camera) {
      return;
    }
    const video = camera.getVideoElement();
    if (!video) {
      return;
    }
    const photoBlob = await camera.takePhoto();
    if (!photoBlob) {
      return;
    }
    const cameraAspectRatio = MediaUtils.getAspectRatio(video);
    const dimensions = getMaxDimensionsRespectingAspectRatio(cameraAspectRatio);
    const newImageData = {
      date: Date.now(),
      blob: photoBlob,
      width: dimensions.width,
      height: dimensions.height
    };

    IdbUtils.saveImageData(newImageData);
    this.setState(({ imageData }) => ({
      imageData: [...imageData, newImageData]
    }));
  };

  deleteImage = (key: number) => {
    IdbUtils.deleteImageData(key);
    this.setState(({ imageData }) => ({
      imageData: imageData.filter(({ date }) => date !== key)
    }));
  };

  render() {
    return (
      <div className="centered">
        <div className="App__camera-container">
          <Camera ref={this.cameraRef} className="camera-container__camera" />
          <button
            onClick={this.onNewPhoto}
            className="camera-container__button button"
            aria-label="Take photo"
            title="Take photo"
          />
        </div>
        <DownloadableImageList
          imageData={this.state.imageData}
          deleteImage={this.deleteImage}
        />
      </div>
    );
  }
}

export default App;
